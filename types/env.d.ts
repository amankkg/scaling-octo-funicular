declare interface ImportMeta {
  url: string
  hot: ImportMetaHot
  env: {
    MODE: 'development' | 'production'
    SNOWPACK_PUBLIC_API_URL: string
  }
}

declare interface ProcessEnv {
  NODE_ENV: 'development' | 'production'
  SNOWPACK_PUBLIC_API_URL: string
  CLIENT_ORIGIN: string
  PORT: number
}
