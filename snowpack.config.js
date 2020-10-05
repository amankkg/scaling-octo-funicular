module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  devOptions: {
    open: 'none',
  },
  exclude: ['src/server/*'],
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    ['@snowpack/plugin-run-script', {cmd: 'tsc --noEmit', watch: '$1 --watch'}],
  ],
}
