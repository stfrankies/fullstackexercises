import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, USER } from './gqlactions'
import Login from './components/Login'


const App = () => {
 
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(undefined)
  const client = useApolloClient()

  const query_authors = useQuery(ALL_AUTHORS)
  const query_books = useQuery(ALL_BOOKS)
  const query_user = useQuery(USER)

  if(query_authors.loading || query_books.loading){
    return <div>spinner...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  console.log(query_user)
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? 
        <button onClick={() => setPage('login')}>login</button>
        : (<>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button></>
          )
        }
        <button onClick={() => setPage('recommend')}>recommend</button>
      </div>

      <Authors allAuthors={query_authors.data.allAuthors} show={page === 'authors'} />

      <Books allBooks={query_books.data.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} />

      {token ? (<Recommend show={page === 'recommend'} favoriteGenres={query_user.data.me.favoriteGenres} allBooks={query_books.data.allBooks}/>): null}
    </div>
  )
}

export default App
