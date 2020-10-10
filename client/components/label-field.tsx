import React from 'react'

type Props = {label: string} & React.InputHTMLAttributes<HTMLInputElement>

export const LabelField = ({label, ...props}: Props) => (
  <label>
    {label}
    <input {...props} />
  </label>
)
