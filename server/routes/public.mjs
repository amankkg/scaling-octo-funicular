import express from 'express'

export const router = express.Router()

router.post('/people', async (req, res) => {
  const person = {...req.body}

  try {
    const result = await req.db.people.insertOne(person)

    person.id = result.insertedId
  } catch (error) {
    console.error(error)

    return res.status(500).send(error)
  }

  res.status(201).send(person)
})
