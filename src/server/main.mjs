import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

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

app.listen(process.env.API_PORT)
