import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const initAuth = (secret, tokenTtl) => {
  async function authorizeUser(rawPassword, passwordHash, identity) {
    const match = await bcrypt.compare(rawPassword, passwordHash)

    if (!match) return

    const accessToken = jwt.sign(identity, secret, {expiresIn: tokenTtl})
    const expireDate = new Date(Date.now() + tokenTtl * 1e3)

    return {accessToken, expireDate}
  }

  const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, (error, identity) => {
      if (error != null) return res.status(403).send(error.message)

      req.userId = identity.id

      next()
    })
  }

  return {authMiddleware, authorizeUser}
}
