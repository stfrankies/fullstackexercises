import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql
    `query {
        allAuthors{
            id,
            name,
            born,
            bookCount
        }
    }`
  
  export const ALL_BOOKS = gql
    `query{
      allBooks {
        id
        title,
        published,
        genres
        author {
          name
          born
        }
      }
    }`


    export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
      addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
      ){
        title
        author{
          name
        }
        published
        genres
      }
    }
    `

    export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!){
        editAuthor(name: $name, setBornTo: $born){
          name
          born
        }
    }`

  export const USER_LOGIN = gql`
    mutation login($username: String!, $password: String!){
      login(username: $username, password: $password){
        value
      }
    }
  `

  export const USER = gql `
  query Me {
    me {
      username
      favoriteGenres
    }
  }
  `