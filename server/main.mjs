import express from 'express'
import dotenv from 'dotenv'
import mongodb from 'mongodb'

dotenv.config()

const app = express()
  .use(express.json())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )

    next()
  })

const client = new mongodb.MongoClient(process.env.DB_URI, {
  useUnifiedTopology: true,
})

await client.connect()

app.post('/login', async (req, res) => {
  let [status, data] = [201]
  const query = req.body
  const options = {projection: {_id: 1}}

  try {
    const result = await client
      .db()
      .collection('accounts')
      .findOne(query, options)

    if (result) data = result._id
    else status = 400
  } catch (error) {
    console.error(error)

    status = 500
    data = error
  }

  res.status(status).send(data)
})

app.get('/people', async (req, res) => {
  let [status, data] = [200]

  try {
    data = await client
      .db()
      .collection('persons')
      .find()
      .map(({_id, ...p}) => ({...p, id: _id}))
      .toArray()
  } catch (error) {
    console.error(error)

    status = 500
    data = error
  }

  res.status(status).send(data)
})

app.post('/people', async (req, res) => {
  let [status, data] = [201, req.body]

  try {
    const result = await client.db().collection('persons').insertOne(data)

    data.id = result.insertedId
  } catch (error) {
    console.error(error)

    status = 500
    data = error
  }

  res.status(status).send(data)
})

app.listen(process.env.PORT)
