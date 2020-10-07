import React, {useState} from 'react'

export const LoginForm = () => {
  const [showPassword, togglePassword] = useState(false)

  const onTogglePassword = () => togglePassword((x) => !x)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const formObject = {} as Record<string, any>

    formData.forEach((v, k) => (formObject[k] = v))

    fetch(import.meta.env.SNOWPACK_PUBLIC_API_URL + '/login', {
      method: 'post',
      body: JSON.stringify(formObject),
      headers: {'Content-Type': 'application/json'},
    })
      .then((resp) => {
        if (resp.ok) return resp.json().then((id) => alert(id))

        alert('Failure')
      })
      .catch(() => alert('Error'))
  }

  return (
    <form onSubmit={onSubmit} className="person-form">
      <h1>Login Form</h1>
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
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
        <button>Submit</button>
      </div>
    </form>
  )
}
