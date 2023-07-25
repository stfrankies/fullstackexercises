const { ApolloServer } = require('@apollo/server')
const { v1: uuid } = require('uuid')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author_model')
const Book = require('./models/book_model')
const User = require('./models/user_model')
const { GraphQLError } = require('graphql')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
	}

  type Author {
		name: String!
		id: String!
		born: Int
    bookCount: Int
	}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
	addBook(
		title: String!
		author: String!
		published: Int!
		genres: [String!]!
	): Book
    editAuthor(
		name: String!
		setBornTo: Int!
	): Author
  createUser(
    username: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`

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

      try{
        const newbook = new Book({ ...args, author: findAuthor })
        console.log(newbook)
        await newbook.save()
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
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
        })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating new user was unsuccessful', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
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
  }
}
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  
  startStandaloneServer(server, {
    listen: { port: process.env.PORT },
    context: async({req, res}) => {
      const auth = req ? req.headers.authorization : null
      
      if(auth && auth.startsWith('Bearer ')){
        const decodedTkn = jwt.verify(
          auth.substring(7), process.env.JWT_PRIVATE
        )
        const currentUser = await User.findById(decodedTkn.id)
        return {currentUser}
      }
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })