const { ApolloServer } = require('@apollo/server')
const { v1: uuid } = require('uuid')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author_model')
const Book = require('./models/book_model')
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
	}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
        return await Author.find({})
      },
    },
   
    Mutation: {
      addBook: async (root, args) => {
        const pickAuthor = await Author.findOne({ name: args.author })
        const book = new Book({ ...args, author: pickAuthor })

        try{
          await book.save()
        } catch (error) {
          throw new GraphQLError('saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        }
        return book
      },
      editAuthor: async (root, args) => {
        const author = await Author.findone({ name: args.name })
        if(!author){
          return null
        }else{
        author.born = args.born
        try{
           await author.save()
        } catch (error) {
          throw new GraphQLError('saving born failed',{
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
        }
      }
    }
  }
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  
  startStandaloneServer(server, {
    listen: { port: process.env.PORT },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })