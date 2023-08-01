const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const Author = require('./models/author_model')
const Book = require('./models/book_model')
const User = require('./models/user_model')

const pubSub = new PubSub()

const resolvers = {

    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        return await Book.find({}).populate('author').exec()
      },
      allAuthors: async () => {
        const authors = await Author.find({})
        return authors
      },
      me: async (root, args, context) => {
        return context.currentUser
      }
    },

    Author: {
      bookCount: async(root) => {
        const foundAuthor = await Author.findOne({ _id: root._id })
        const countBooks = await Book.find({ author : foundAuthor._id })
        return countBooks.length
      }
    },
  
    Mutation: {
      addBook: async (root, args, context) => {
        const pickAuthor = await Author.findOne({ name: args.author })
        const currentUser = context.currentUser
  
        if(!currentUser){
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
          }
        
        if(!pickAuthor){
          const newAuthor = new Author({ name: args.author, born: 1900})
          try{
            await newAuthor.save()
          } catch(error){
            throw new GraphQLError('saving author failed',{
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                error
              }
            })
          }
        }
  
        const findAuthor = await Author.findOne({name: args.author})
        const newbook = new Book({ ...args, author: findAuthor })

        try{ 
          const result = await newbook.save()
          await Author.findByIdAndUpdate(result.author._id, {$push: {mybooks: result._id}})
          const savedBook = await Book.findById(newbook.id).populate('author')
          pubSub.publish('BOOK_ADD', {bookAdd: savedBook})
        } catch (error) {
          throw new GraphQLError('saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        }
        return newbook
      },

      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name: args.name })
        if(!author){
          return null
        }else{
        author.born = args.setBornTo
        try{
            await author.save()
        } catch (error) {
          throw new GraphQLError('saving born year failed',{
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
        }
      },

      createUser: async (root, args) => {  
        try{
          const user = new User(args)
          await user.save()
          return user
        } catch(error) {
            throw new GraphQLError('Creating new user was unsuccessful', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
      },

      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if( !user || args.password != 'pass123' ){
          throw new GraphQLError('Wrong username or password', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userToken = {
          username: user.username,
          id: user._id
        }
        return { value: jwt.sign(userToken, process.env.JWT_PRIVATE) }
      },
    },
    Subscription: {
      bookAdd:{
        subscribe: () => pubSub.asyncIterator("BOOK_ADD")
      },
    },
  }

  module.exports = resolvers