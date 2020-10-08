import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongodb from 'mongodb'

dotenv.config()

const {DB_URI} = process.env
const CLIENT_ORIGIN = 'http://localhost:8080'
const ACCESS_TOKEN = 'f9bf78b9a18ce6d46a0cd2b0b86df9da'
const TOKEN_TTL = 3600
const PORT = 8081

const app = express()
  .use(express.json())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    )

    next()
  })

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, ACCESS_TOKEN, (error, identity) => {
    if (error != null) return res.status(403).send(error)

    req.userId = identity.id

    next()
  })
}

const generateAccessToken = (identity) => {
  const accessToken = jwt.sign(identity, ACCESS_TOKEN, {expiresIn: TOKEN_TTL})
  const expiresAt = Date.now() + TOKEN_TTL * 1e3

  return [accessToken, new Date(expiresAt)]
}

const client = new mongodb.MongoClient(DB_URI, {useUnifiedTopology: true})

await client.connect()

app.post('/signin', async (req, res) => {
  const query = {login: req.body.login}
  let user

  try {
    user = await client.db().collection('accounts').findOne(query)
  } catch (error) {
    console.error(error)

    return res.status(500).send(error)
  }

  if (!user) return res.sendStatus(400)

  const match = await bcrypt.compare(req.body.password, user.passwordHash)

  if (!match) return res.sendStatus(400)

  const identity = {id: user._id}
  const [accessToken, expireDate] = generateAccessToken(identity)
  const payload = {accessToken, expireDate}

  res.status(201).send(payload)
})

app.get('/people', authenticateToken, async (req, res) => {
  let people

  try {
    people = await client
      .db()
      .collection('persons')
      .find()
      .map(({_id, ...p}) => ({...p, id: _id}))
      .toArray()
  } catch (error) {
    console.error(error)

    return res.status(500).send(error)
  }

  res.status(200).send(people)
})

app.post('/people', async (req, res) => {
  const person = {...req.body}

  try {
    const result = await client.db().collection('persons').insertOne(person)

    person.id = result.insertedId
  } catch (error) {
    console.error(error)

    return res.status(500).send(error)
  }

  res.status(201).send(person)
})

app.listen(PORT)
