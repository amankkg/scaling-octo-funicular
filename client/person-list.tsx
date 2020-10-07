import React, {useEffect, useState} from 'react'

import './person-list.css'

type Status = 'OK' | 'loading' | 'error'

export const PersonList = () => {
  const [[persons, status], setPersons] = useState([
    [] as Person[],
    'loading' as Status,
  ])

  useEffect(() => {
    fetch(import.meta.env.SNOWPACK_PUBLIC_API_URL + '/people')
      .then((resp) => resp.json())
      .then((persons) => setPersons([persons as Person[], 'OK']))
      .catch(() => setPersons([[], 'error']))
  }, [])

  return (
    <>
      <h1>Person List</h1>
      <ul className="person-list">
        {persons.map((p) => (
          <li key={p.id}>
            {p.firstName} {p.lastName}
          </li>
        ))}
      </ul>
      {status === 'OK' && persons.length === 0 && <p>no persons yet</p>}
      {status !== 'OK' && <p>{status}</p>}
    </>
  )
}
