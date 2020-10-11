const dotenv = require('dotenv')

dotenv.config()

const {CLIENT_PORT = 8080, BROWSER = 'none'} = process.env

module.exports = {
  mount: {
    client: '/_dist_',
    public: '/',
  },
  devOptions: {
    port: parseInt(CLIENT_PORT),
    open: BROWSER,
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  alias: {client: './client'},
}
