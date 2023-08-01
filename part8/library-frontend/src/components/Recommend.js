const Recommend = ({ show, favoriteGenres, allBooks }) => {

    if (!show) {
        return null
    }

    const bookFilter = allBooks.filter((books) => favoriteGenres.some((gen) => books.genres.includes(gen)))

    return (
        <div>
          <h2>Recommendations</h2>
          <p>books in your favorite genres {favoriteGenres} </p>
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
        </div> 
    )
}

export default Recommend