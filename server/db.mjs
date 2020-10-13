import mongodb from 'mongodb'

const uri = process.env.DB_URI
const client = new mongodb.MongoClient(uri, {useUnifiedTopology: true})

await client.connect()

export const middleware = (req, res, next) => {
  req.db = {
    accounts: client.db().collection('accounts'),
    people: client.db().collection('people'),
  }

  next()
}
