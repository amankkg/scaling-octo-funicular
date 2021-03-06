const TOKEN_KEY = 'token'

export const read = () => {
  const raw = localStorage.getItem(TOKEN_KEY)

  if (raw) {
    try {
      const {accessToken, expireDate}: TokenPayload = JSON.parse(raw)

      if (Date.parse(expireDate) > Date.now()) return accessToken
    } catch {}
  }

  localStorage.clear()
}

export const write = (payload: TokenPayload) => {
  const json = JSON.stringify(payload)

  localStorage.setItem(TOKEN_KEY, json)
}
