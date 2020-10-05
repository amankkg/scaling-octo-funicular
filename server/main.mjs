import express from 'express'
import dotenv from 'dotenv'
import {nanoid} from 'nanoid/async'

dotenv.config()

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )

  next()
})

/** @type {Person[]} */
const stubUsers = [
  {
    id: await nanoid(),
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 123 3322114',
    ssn: '123-12-1234',
    address: 'Demo Address 123',
  },
  {
    id: await nanoid(),
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '+1 123 1122334',
    ssn: '123-12-4321',
    address: 'Demo Address 456',
  },
  {
    id: await nanoid(),
    firstName: 'Jim',
    lastName: 'Doe',
    phone: '+1 123 4561231',
    ssn: '123-12-1212',
    address: 'Demo Address 321',
  },
]

app.get('/users', (req, res) => {
  res.status(200).send(stubUsers)
})

app.post('/users', async (req, res) => {
  /** @type {PersonCreateDto} */
  const userData = req.body

  userData.id = await nanoid()

  stubUsers.push(userData)

  res.status(201).send(userData)
})

app.listen(process.env.PORT)
