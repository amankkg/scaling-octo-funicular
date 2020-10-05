declare type Person = {
  id: string
  firstName: string
  lastName: string
  phone: string
  address: string
  ssn: string
}

declare type PersonCreateDto = Omit<Person, 'id'>
