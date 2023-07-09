import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './gqlactions'


const App = () => {
 
  const [page, setPage] = useState('authors')

  const query_authors = useQuery(ALL_AUTHORS)
  const query_books = useQuery(ALL_BOOKS)

  if(query_authors.loading || query_books.loading){
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
