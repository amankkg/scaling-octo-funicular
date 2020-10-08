const TOKEN_KEY = 'token'

type TokenPayload = {
  accessToken: string
  expireDate: string
}

export const read = () => {
  const raw = localStorage.getItem(TOKEN_KEY)

  if (!raw) return

  try {
    const {accessToken, expireDate}: TokenPayload = JSON.parse(raw)

    if (Date.parse(expireDate) > Date.now()) return accessToken
  } catch {
    return
  }
}

export const write = (payload: TokenPayload) => {
  const json = JSON.stringify(payload)

  localStorage.setItem(TOKEN_KEY, json)
}
