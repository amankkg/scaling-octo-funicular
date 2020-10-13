import 'dotenv/config.js'
import express from 'express'

import * as auth from './auth.mjs'
import * as cors from './cors.mjs'
import * as db from './db.mjs'

import {getPeople, getPerson} from './controllers/admin.mjs'
import {signIn} from './controllers/auth.mjs'
import {register} from './controllers/register.mjs'

const port = parseInt(process.env.SERVER_PORT)

express()
  .use(express.json())
  .use(cors.middleware)
  .use(db.middleware)
  .post('/signin', signIn)
  .post('/register', register)
  .get('/people', auth.middleware, getPeople)
  .get('/people/:personId', auth.middleware, getPerson)
  .listen(port, () => {
    console.info(`API server started at http://localhost:${port}`)
  })
