import React, {useState} from 'react'

import {LabelField} from '../components'
import {api} from '../services'
import {getFormObject} from '../utils'

export const SignIn = ({onSignIn}: PageProps) => {
  const [showPassword, togglePassword] = useState(false)

  const onTogglePassword = () => togglePassword((x) => !x)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    async function signIn(data: Record<string, any>) {
      const result = await api<TokenPayload>('/signin', 'post', data)

      if (result.status === 'rejected') {
        alert(result.error ?? result.errorCode)

        return
      }

      onSignIn(result.data)
    }

    event.preventDefault()
    signIn(getFormObject(event))
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <LabelField name="login" required label="Login" />
      <LabelField
        name="password"
        type={showPassword ? 'text' : 'password'}
        required
        label="Password"
      />
      <div className="form-actions">
        <button type="button" onClick={onTogglePassword}>
          {showPassword ? 'Hide' : 'Show'} password
        </button>
        <button>Submit</button>
      </div>
    </form>
  )
}
