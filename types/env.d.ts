declare interface ImportMeta {
  url: string
  hot: ImportMetaHot
  env: {
    MODE: 'development' | 'production'
    SNOWPACK_PUBLIC_API: string
  }
}

declare interface ProcessEnv {
  NODE_ENV: 'development' | 'production'
  DB_URI: string
  BROWSER: string
  CLIENT_PORT: string
  CLIENT_ORIGIN: string
  SERVER_PORT: string
  TOKEN_SECRET: string
  TOKEN_TTL: string
}
