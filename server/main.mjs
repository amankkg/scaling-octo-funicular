import dotenv from 'dotenv'
import express from 'express'

import {initAuth} from './auth.mjs'
import {initCorsMiddleware} from './cors.mjs'
import {initDbMiddleware} from './db.mjs'
import {getPeople, getPerson} from './controllers/admin.mjs'
import {register} from './controllers/register.mjs'

dotenv.config()

const {
  DB_URI,
  CLIENT_ORIGIN = 'http://localhost:8080',
  TOKEN_SECRET = 'f9bf78b9a18ce6d46a0cd2b0b86df9da',
  TOKEN_TTL = 3600,
  SERVER_PORT = 8081,
} = process.env

const {authMiddleware, authorizeUser} = initAuth(
  TOKEN_SECRET,
  parseInt(TOKEN_TTL),
)

const app = express()
  .use(express.json())
  .use(initCorsMiddleware(CLIENT_ORIGIN))
  .use(await initDbMiddleware(DB_URI))

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

app
  .get('/people', authMiddleware, getPeople)
  .get('/people/:personId', authMiddleware, getPerson)
  .post('/register', register)

app.listen(SERVER_PORT, () => {
  console.info(`API server started at http://localhost:${SERVER_PORT}`)
})
