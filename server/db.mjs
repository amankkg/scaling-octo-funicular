import mongodb from 'mongodb'

export async function initDbMiddleware(uri) {
  const client = new mongodb.MongoClient(uri, {useUnifiedTopology: true})

  await client.connect()

  const db = {
    accounts: client.db().collection('accounts'),
    people: client.db().collection('people'),
  }

  const middleware = (req, res, next) => {
    req.db = db

    next()
  }

  return middleware
}
