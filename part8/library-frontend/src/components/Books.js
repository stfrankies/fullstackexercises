import { useState } from 'react'

const Books = ({show, allBooks}) => {

  const [genre, setGenre] = useState('All genres')
  const genres = ["Literature", "adventure", "Science", "All genres"]

  if (!show) {
    return null
  }

  const bookFilter = allBooks.filter(books => genre === 'All genres' ? books : books.genres.includes(genre))

  console.log(bookFilter)

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookFilter.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {genres.map(gen=>(
          <button onClick={() => setGenre(gen)} >{gen}</button>
        ))}
      </>
    </div>
  )
}

export default Books
