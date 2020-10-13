const origin = process.env.CLIENT_ORIGIN

export const middleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', origin)

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )

  next()
}
