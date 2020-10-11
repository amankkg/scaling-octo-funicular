const withId = ({_id, ...p}) => ({...p, id: _id})

export async function getPeople(req, res) {
  let people

  try {
    people = await req.db.people.find().map(withId).toArray()
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
    res.status(200).send(withId(person))
  } else {
    res.sendStatus(404)
  }
}
