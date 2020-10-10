import React, {useEffect, useMemo, useState} from 'react'

import {useHashRouter} from './hooks'
import * as pages from './pages'
import {tokenStorage} from './services'
import logo from './logo.svg'
import './app.css'

type PageData = {
  page: React.ReactNode
  title: string
  role?: Role
}

const startRole = tokenStorage.read() ? 'admin' : 'anonymous'

export const App = () => {
  const [role, setRole] = useState<Role>(startRole)

  const routes: Record<string, PageData> = useMemo(
    () => ({
      '#/': {page: <pages.Register />, title: 'Register'},
      '#/people': {page: <pages.People />, title: 'People', role: 'admin'},
      '#/sign-in': {
        page: <pages.SignIn setRole={setRole} />,
        title: 'Sign In',
        role: 'anonymous',
      },
    }),
    [setRole],
  )

  const {page, title} = useHashRouter(routes, routes['#/'])

  useEffect(() => {
    document.title = `${title} | ${role}`
  }, [title])

  useEffect(() => {
    if (role === 'admin') location.hash = '#/people'
  }, [role])

  return (
    <div className="app">
      <header className="app-header">
        <a href="#/">
          <img src={logo} className="app-logo" alt="logo" />
        </a>
        <div>
          {Object.entries(routes)
            .filter(([_, data]) => !data.role || data.role === role)
            .map(([key, data]) => (
              <a key={key} href={key}>
                {data.title}
              </a>
            ))}
          <h1>{title}</h1>
        </div>
      </header>
      <main className="app-body">{page}</main>
    </div>
  )
}
