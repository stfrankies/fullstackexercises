import { useState } from 'react'

const Books = ({show, allBooks}) => {

  const [genre, setGenre] = useState('All genres')

  const genresExtract = allBooks.map(b => Object.values(b.genres))
  const genres = [...new Set(genresExtract.flat())]

  genres.push("All genres")
  
  if (!show) {
    return null
  }

  const bookFilter = allBooks.filter(books => genre === 'All genres' ? books : books.genres.includes(genre))

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
        {genres.map((gen, idx)=>(
          <button onClick={() => setGenre(gen)} key={idx}>{gen}</button>
        ))}
      </>
    </div>
  )
}

export default Books
