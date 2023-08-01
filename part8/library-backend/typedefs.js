const typeDefs = `
  type User {
    username: String!
    favoriteGenres: [String]
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
    mybooks: [Book!]!
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
    favoriteGenres: [String]
  ): User
  login(
    username: String!
    password: String!
  ): Token
}

type Subscription{
  bookAdd: Book!
}
`

module.exports = typeDefs