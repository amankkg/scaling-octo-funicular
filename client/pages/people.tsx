import React from 'react'

import {useApi} from '../hooks'

export const People = (props: PageProps) => {
  const state = useApi<Person[]>('/people')

  return (
    <>
      {state.status === 'fulfilled' && (
        <ul className="person-list">
          {state.data.map((p) => (
            <li key={p.id}>
              <h1>
                {p.firstName} {p.lastName}
              </h1>
              <p>
                <b>SSN:</b> {p.ssn}
              </p>
              <p>☎️ {p.phone}</p>
              <p>🏠 {p.address}</p>
            </li>
          ))}
        </ul>
      )}
      {state.status === 'fulfilled' && state.data.length === 0 && (
        <p>no persons yet</p>
      )}
      {state.status === 'pending' && <p>{state.status}</p>}
      {state.status === 'rejected' && <p>{state.error ?? state.errorCode}</p>}
    </>
  )
}
