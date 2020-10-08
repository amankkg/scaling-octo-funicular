module.exports = {
  mount: {
    client: '/_dist_',
    public: '/',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    // TODO: add typescript plugin
    ['@snowpack/plugin-run-script', {cmd: 'tsc --noEmit', watch: '$1 --watch'}],
  ],
}
