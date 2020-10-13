import React, {useState} from 'react'

import {useApi} from 'client/hooks'

import styles from './people.module.css'

export const People = (props: PageProps) => {
  const state = useApi<Person[]>('/people')
  const [activeIndex, setActive] = useState(0)

  const onItemClick = (index: number) => (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault()
    setActive(index)
  }

  return (
    <>
      {state.status === 'fulfilled' && (
        <ul className={styles.list}>
          {state.data.map((p, i) => (
            <li key={p.id}>
              <h1>
                {i === activeIndex ? (
                  `${p.firstName} ${p.lastName}`
                ) : (
                  <a href="#" onClick={onItemClick(i)}>
                    {p.firstName} {p.lastName}
                  </a>
                )}
              </h1>
              {i === activeIndex && (
                <>
                  <p>
                    <b>SSN:</b> {p.ssn}
                  </p>
                  <p>☎️ {p.phone}</p>
                  <p>🏠 {p.address}</p>
                </>
              )}
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
