import { useState } from 'react'
import {gql, useMutation} from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from '../App'

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!){
    editAuthor(name: $name, setBornTo: $born){
      name
      born
    }
  }
`


const Authors = ({show, allAuthors}) => {

  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState(1900)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}],
    onError: (error)=>{
      console.log(error.graphQLErrors[0].message)
    }
  })

  if (!show) {
    return null
  }

  const submit = (event) =>{
    event.preventDefault()

    editAuthor({ variables: {name, born}})

    setBorn(1900)
    setName('')
  }
  
  const authors = allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors