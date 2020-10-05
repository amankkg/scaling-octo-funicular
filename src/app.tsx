import React, {useEffect, useState} from 'react'

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
    </div>
  )
}