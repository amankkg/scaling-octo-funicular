import React, {useState} from 'react'

import {api, tokenStorage} from './services'

type TokenPayload = {
  accessToken: string
  expireDate: string
}

export const SignInForm = () => {
  const [showPassword, togglePassword] = useState(false)

  const onTogglePassword = () => togglePassword((x) => !x)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const formObject = {} as Record<string, any>

    formData.forEach((v, k) => (formObject[k] = v))

    api<TokenPayload>('/signin', 'post', formObject).then((result) => {
      if (result.status === 'fulfilled') tokenStorage.write(result.data)
      else alert(result.error ?? result.errorCode)
    })
  }

  return (
    <form onSubmit={onSubmit} className="person-form">
      <h1>Sign In Form</h1>
      <label>
        Login
        <input name="login" required />
      </label>
      <label>
        Password
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
        />
      </label>
      <div className="person-form-actions">
        <button type="button" onClick={onTogglePassword}>
          {showPassword ? 'Hide' : 'Show'} password
        </button>
        <button>Submit</button>
      </div>
    </form>
  )
}
