import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

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
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      }
  }
`

let options = []

const Authors = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [newBorn, setNewBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    let name = selectedOption.value
    console.log(name)
    console.log(typeof (name))

    let setBornTo = parseInt(newBorn)
    editAuthor({ variables: { name, setBornTo } })

    setSelectedOption(null)
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


    authors.map(a => {
      return options.push({ value: a.name, label: a.name })
    }
    )

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
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
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
