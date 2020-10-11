import React, {useState} from 'react'

import {LabelField} from 'client/components'
import {api} from 'client/services'
import {getFormObject} from 'client/utils'

export const Register = (props: PageProps) => {
  const [key, setKey] = useState(0)

  const onReset = () => setKey((key) => key + 1)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    async function submit(data: Record<string, any>) {
      const result = await api<Person>('/register', 'post', data)

      if (result.status === 'rejected') {
        alert(result.error ?? result.errorCode)

        return
      }

      alert('created')
      onReset()
    }

    event.preventDefault()
    submit(getFormObject(event))
  }

  return (
    <form key={key} onSubmit={onSubmit} className="form">
      <LabelField
        name="firstName"
        required
        label="First name"
        placeholder="e.g. John"
      />
      <LabelField
        name="lastName"
        required
        label="Last name"
        placeholder="e.g. Doe"
      />
      <LabelField
        name="phone"
        type="tel"
        pattern="\+1\s[0-9]{3}\s[0-9]{7}"
        required
        label="Phone"
        placeholder="+1 555 5555555"
      />
      <LabelField
        name="ssn"
        pattern="[0-8]{3}-[0-9]{2}-[0-9]{4}"
        required
        label="SSN"
        placeholder="078-05-1120"
      />
      <LabelField
        name="address"
        required
        label="Address"
        placeholder="e.g. 123 Main St Anytown, USA"
      />
      <div className="form-actions">
        <button type="button" onClick={onReset}>
          Reset
        </button>
        <button>Submit</button>
      </div>
    </form>
  )
}
