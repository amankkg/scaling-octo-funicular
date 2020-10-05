import React, {useState} from 'react'

import './person-form.css'

export const PersonForm = () => {
  const [key, setKey] = useState(0)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const formObject = {} as Record<string, any>

    formData.forEach((v, k) => (formObject[k] = v))

    const body = JSON.stringify(formObject)

    fetch(import.meta.env.SNOWPACK_PUBLIC_API_URL, {method: 'get'})
      .then((resp) => resp.text())
      .then((data) => alert(`${data}\n${body}`))
  }

  const onReset = () => setKey((key) => key + 1)

  return (
    <form onSubmit={onSubmit} className="person-form">
      <h1>Person Form</h1>
      <label>
        First name <input key={key} name="firstName" required />
      </label>
      <label>
        Last name <input key={key} name="lastName" required />
      </label>
      <label>
        Phone number <input key={key} name="phoneNumber" type="tel" required />
      </label>
      <label>
        Full address <input key={key} name="address" required />
      </label>
      <label>
        SSN{' '}
        <input
          key={key}
          name="ssn"
          type="number"
          min={1e9}
          max={1e10 - 1}
          required
        />
      </label>
      <div className="person-form-actions">
        <button type="button" onClick={onReset}>
          Reset
        </button>
        <button>Submit</button>
      </div>
    </form>
  )
}
