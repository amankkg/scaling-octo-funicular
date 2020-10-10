import React, {useState} from 'react'

import {LabelField} from '../components'
import {api, tokenStorage} from '../services'
import {getFormObject} from '../utils'

type TokenPayload = {
  accessToken: string
  expireDate: string
}

type Props = {setRole: (role: Role) => void}

export const SignIn = ({setRole}: Props) => {
  const [showPassword, togglePassword] = useState(false)

  const onTogglePassword = () => togglePassword((x) => !x)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    async function signIn(data: Record<string, any>) {
      const result = await api<TokenPayload>('/signin', 'post', data)

      if (result.status === 'rejected')
        return alert(result.error ?? result.errorCode)

      tokenStorage.write(result.data)
      setRole('admin')
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
