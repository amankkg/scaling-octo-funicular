import {decrypt} from '../crypto.mjs'

const parsePerson = ({_id, ssn, data}) => ({
  ...JSON.parse(data),
  id: _id,
  ssn: decrypt(ssn),
})

export async function getPeople(req, res) {
  let people

  try {
    people = await req.db.people.find().map(parsePerson).toArray()
  } catch (error) {
    res.status(500).send(error)

    return
  }

  res.status(200).send(people)
}

export async function getPerson(req, res) {
  const query = {_id: req.params.personId}
  let person

  try {
    person = await req.db.people.findOne(query)
  } catch (error) {
    res.status(500).send(error)

    return
  }

  if (person) {
    res.status(200).send(parsePerson(person))
  } else {
    res.sendStatus(404)
  }
}
