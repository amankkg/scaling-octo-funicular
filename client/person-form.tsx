import React, {useState} from 'react'

import './person-form.css'

export const PersonForm = () => {
  const [key, setKey] = useState(0)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const formObject = {} as Record<string, any>

    formData.forEach((v, k) => (formObject[k] = v))

    fetch(import.meta.env.SNOWPACK_PUBLIC_API_URL + '/users', {
      method: 'post',
      body: JSON.stringify(formObject),
      headers: {'Content-Type': 'application/json'},
    })
      .then((resp) => {
        setKey((key) => key + 1)
        alert(resp.ok ? 'Success' : 'Failure')
      })
      .catch(() => alert('Error'))
  }

  const onReset = () => setKey((key) => key + 1)

  return (
    <form onSubmit={onSubmit} className="person-form">
      <h1>Person Form</h1>
      <label>
        First name
        <input key={key} name="firstName" required placeholder="e.g. John" />
      </label>
      <label>
        Last name
        <input key={key} name="lastName" required placeholder="e.g. Doe" />
      </label>
      <label>
        Phone number
        <input
          key={key}
          name="phoneNumber"
          type="tel"
          pattern="\+1\s[0-9]{3}\s[0-9]{7}"
          required
          placeholder="+1 555 5555555"
        />
      </label>
      <label>
        Full address
        <input
          key={key}
          name="address"
          required
          placeholder="e.g. 123 Main St Anytown, USA"
        />
      </label>
      <label>
        SSN
        <input
          key={key}
          name="ssn"
          pattern="[0-8]{3}-[0-9]{2}-[0-9]{4}"
          required
          placeholder="078-05-1120"
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
