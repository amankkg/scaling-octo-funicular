import React from 'react'

import {useApi} from './hooks'

import './person-list.css'

export const PersonList = () => {
  const state = useApi<Person[]>('/admin/people')

  return (
    <>
      <h1>Person List</h1>
      {state.status === 'fulfilled' && (
        <ul className="person-list">
          {state.data.map((p) => (
            <li key={p.id}>
              {p.firstName} {p.lastName}
            </li>
          ))}
        </ul>
      )}
      {state.status === 'fulfilled' && state.data.length === 0 && (
        <p>no persons yet</p>
      )}
      {state.status === 'pending' && <p>{status}</p>}
      {state.status === 'rejected' && <p>{state.error ?? state.errorCode}</p>}
    </>
  )
}
