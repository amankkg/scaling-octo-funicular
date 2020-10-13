import crypto from 'crypto'

const IN = 'utf8'
const OUT = 'hex'
const algo = 'aes-256-gcm'
const secret = process.env.TOKEN_SECRET

export const encrypt = (openText) => {
  const iv = Buffer.from(crypto.randomBytes(16), IN)
  const cipher = crypto.createCipheriv(algo, secret, iv)
  const encrypted = cipher.update(openText, IN, OUT) + cipher.final(OUT)
  const authTag = cipher.getAuthTag().toString(OUT)

  return [encrypted, iv.toString(OUT), authTag].join(';')
}

export const decrypt = (cipherText) => {
  const [encrypted, iv, authTag] = cipherText
    .split(';')
    .map((x) => Buffer.from(x, OUT))

  const decipher = crypto.createDecipheriv(algo, secret, iv)

  decipher.setAuthTag(authTag)

  return decipher.update(encrypted, OUT, IN) + decipher.final(IN)
}
