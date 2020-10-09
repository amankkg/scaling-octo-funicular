export async function getPeople(req, res) {
  let people

  try {
    people = await req.db.people
      .find()
      .map(({_id, ...p}) => ({...p, id: _id}))
      .toArray()
  } catch (error) {
    console.error(error)

    return res.status(500).send(error)
  }

  res.status(200).send(people)
}

export async function getPerson(req, res) {
  const query = {_id: req.params.personId}
  let user

  try {
    user = await req.db.accounts.findOne(query)
  } catch (error) {
    console.error(error)

    return res.status(500).send(error)
  }

  if (!user) return res.sendStatus(404)

  res.status(200).send(user)
}
