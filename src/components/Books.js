import React from 'react'
import { gql, useQuery } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
    published
    genres

    author
    {name
    born}
    }
  }
`

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  if (result.data) {
    const books = result.data.allBooks

    return (
      <div>
        <h2>books</h2>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
              <th>
                genres
              </th>
            </tr>
            {books.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                <td>{b.genres[0]}, {b.genres[1]}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Books