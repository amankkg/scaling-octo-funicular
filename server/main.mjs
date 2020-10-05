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

app.get('/', (req, res) => {
  res.status(200).send('Pong!')
})

app.post('/users', async (req, res) => {
  const userData = req.body

  userData.id = await nanoid()

  res.status(201).send(userData)
})

app.listen(process.env.PORT)
