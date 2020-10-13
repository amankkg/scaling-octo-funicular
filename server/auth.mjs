import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret = process.env.TOKEN_SECRET
const ttl = parseInt(process.env.TOKEN_TTL)

export async function authorize(rawPassword, passwordHash, identity) {
  const match = await bcrypt.compare(rawPassword, passwordHash)

  if (!match) return

  const accessToken = jwt.sign(identity, secret, {expiresIn: ttl})
  const expireDate = new Date(Date.now() + ttl * 1e3)

  return {accessToken, expireDate}
}

export const middleware = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (token == null) {
    res.sendStatus(401)

    return
  }

  jwt.verify(token, secret, (error, identity) => {
    if (error != null) {
      res.status(403).send(error.message)

      return
    }

    req.userId = identity.id

    next()
  })
}
