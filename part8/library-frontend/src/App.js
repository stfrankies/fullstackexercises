import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADD, USER } from './gqlactions'
import Login from './components/Login'


export const updateCache = (cache, query, bookadd) =>{
  const uniqueByTitle = (a) =>{
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks}) =>{
    return{
      allBooks: uniqueByTitle(allBooks.concat(bookadd))
    }
  })
}


const App = () => {
 
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(undefined)
  const client = useApolloClient()
  const query_authors = useQuery(ALL_AUTHORS)
  const query_books = useQuery(ALL_BOOKS)
  const query_user = useQuery(USER)


  useSubscription(BOOK_ADD, {
    onData: ({data, client})=>{
      console.log(data)

      const addedBook = data.data.bookAdd
      try{
        window.alert(`${addedBook.title} had been added successfully`)
        updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
      }catch(error){
        console.log(error)
      }

      client.cache.updateQuery({ query: ALL_BOOKS}, ({allBooks}) =>{
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  if(query_authors.loading || query_books.loading || query_user.loading){
    return <div>spinner...</div>
  }

  const logout = () => {
    setToken(undefined)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(!token)? 
        <button onClick={() => setPage('login')}>login</button>
        : (<>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button></>
          )
        }
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
