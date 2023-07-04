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


const App = () => {
 
  const [page, setPage] = useState('authors')

  const query = useQuery(ALL_AUTHORS)

  if(query.loading){
    return <div>spinner...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors allAuthors={query.data.allAuthors} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
