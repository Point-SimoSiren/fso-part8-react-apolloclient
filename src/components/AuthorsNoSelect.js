
// THIS FILE IS NOT IN USE. ONLY AN EXAMPLE OF TARGETING RIGHT AUTHOR WHEN
// EDITING AUTHORS BIRTHDATE BY TYPING RIGHT NAME INSTEAD OF REACT-SELECT

import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editauthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [newBorn, setNewBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    const born = parseInt(newBorn)
    editAuthor({ variables: { name, born } })

    setName('')
    setNewBorn('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  if (result.data) {
    const authors = result.data.allAuthors

    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>Set birth year</h2>

        <form onSubmit={submit}>
          <div>
            <input
              value={name} placeholder="name of the author"
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            <input
              value={newBorn} placeholder="year of birth"
              onChange={({ target }) => setNewBorn(target.value)}
            />
          </div>

          <button type='submit'>save</button>
        </form>

      </div>
    )
  }
}

export default Authors
