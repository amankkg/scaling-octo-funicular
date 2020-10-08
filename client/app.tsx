import React, {useEffect, useState} from 'react'

import {PersonForm} from './person-form'
import {PersonList} from './person-list'
import {SignInForm} from './sign-in-form'
import logo from './logo.svg'
import './app.css'

export const App = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(setCount, 1000, (count: number) => count + 1)

    return () => clearTimeout(interval)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          Page has been open for <code>{count}</code> seconds
        </p>
      </header>
      <main className="app-body">
        <SignInForm />
        <PersonForm />
        <PersonList />
      </main>
    </div>
  )
}
