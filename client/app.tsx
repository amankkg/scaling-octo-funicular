import React, {useEffect, useMemo, useState} from 'react'

import {useHashRouter} from './hooks'
import * as pages from './pages'
import {tokenStorage} from './services'
import logo from './logo.svg'
import './app.css'

type PageData = {
  Page: (props: PageProps) => JSX.Element
  title: string
  role?: Role
}

const routes: Record<string, PageData> = {
  '#/': {Page: pages.Register, title: 'Register'},
  '#/people': {Page: pages.People, title: 'People', role: 'admin'},
  '#/sign-in': {Page: pages.SignIn, title: 'Sign In', role: 'anonymous'},
}

const defaultPage = routes['#/']
const defaultRole: Role = tokenStorage.read() ? 'admin' : 'anonymous'

export const App = () => {
  const {Page, title} = useHashRouter(routes, defaultPage)
  const [role, setRole] = useState(defaultRole)

  const onSignIn = (payload: TokenPayload) => {
    setRole('admin')
    tokenStorage.write(payload)
  }

  useEffect(() => {
    document.title = title
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
            .filter(([_, data]) => data.role == null || data.role === role)
            .map(([key, data]) => (
              <a key={key} href={key}>
                {data.title}
              </a>
            ))}
          <h1>{title}</h1>
        </div>
      </header>
      <main className="app-body">
        <Page onSignIn={onSignIn} />
      </main>
    </div>
  )
}
