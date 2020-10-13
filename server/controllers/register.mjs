import {encrypt} from '../crypto.mjs'

const preparePerson = ({ssn, ...rest}) => ({
  data: JSON.stringify(rest),
  ssn: encrypt(ssn),
})

export async function register(req, res) {
  const person = {...req.body}
  const rawPerson = preparePerson(person)

  try {
    const result = await req.db.people.insertOne(rawPerson)

    person.id = result.insertedId
  } catch (error) {
    res.status(500).send(error)

    return
  }

  res.status(201).send(person)
}
