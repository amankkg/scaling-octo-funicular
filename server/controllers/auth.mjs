import {authorize} from '../auth.mjs'

export async function signIn(req, res) {
  const query = {login: req.body.login}
  let user

  try {
    user = await req.db.accounts.findOne(query)
  } catch (error) {
    res.status(500).send(error)

    return
  }

  if (user) {
    const identity = {id: user._id}

    const tokenPayload = await authorize(
      req.body.password,
      user.passwordHash,
      identity,
    )

    if (tokenPayload) {
      res.status(201).send(tokenPayload)

      return
    }
  }

  res.sendStatus(400)
}
