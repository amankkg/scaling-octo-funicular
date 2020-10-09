import dotenv from 'dotenv'
import express from 'express'

import {initAuth} from './auth.mjs'
import {initDbMiddleware} from './db.mjs'
import * as routes from './routes/index.mjs'

dotenv.config()

const {
  DB_URI,
  CLIENT_ORIGIN = 'http://localhost:8080',
  TOKEN_SECRET = 'f9bf78b9a18ce6d46a0cd2b0b86df9da',
  TOKEN_TTL = 3600,
  SERVER_PORT = 8081,
} = process.env

const dbMiddleware = await initDbMiddleware(DB_URI)

const {authMiddleware, authorizeUser} = initAuth(TOKEN_SECRET, TOKEN_TTL)

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN)

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )

  next()
})

app.use(express.json())
app.use(dbMiddleware)

app.use('/admin', authMiddleware, routes.admin)
app.use('/public', routes.public)

app.post('/signin', async (req, res) => {
  const query = {login: req.body.login}
  let user

  try {
    user = await req.db.accounts.findOne(query)
  } catch (error) {
    console.error(error)

    return res.status(500).send(error)
  }

  if (!user) return res.sendStatus(400)

  const identityPayload = {id: user._id}

  const tokenPayload = await authorizeUser(
    req.body.password,
    user.passwordHash,
    identityPayload,
  )

  if (!tokenPayload) return res.sendStatus(400)

  res.status(201).send(tokenPayload)
})

app.listen(SERVER_PORT, () => {
  console.info(`API server started at http://localhost:${SERVER_PORT}`)
})
