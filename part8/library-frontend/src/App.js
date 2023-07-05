import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql
    `query {
        allAuthors{
            name,
            born,
            bookCount
        }
    }`
  
  const ALL_BOOKS = gql
    `query{
      allBooks {
        author,
        title,
        published
      }
    }`


const App = () => {
 
  const [page, setPage] = useState('authors')

  const query_authors = useQuery(ALL_AUTHORS)
  const query_books = useQuery(ALL_BOOKS)

  if(query_authors.loading){
    return <div>spinner...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors allAuthors={query_authors.data.allAuthors} show={page === 'authors'} />

      <Books allBooks={query_books.data.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
