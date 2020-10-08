declare interface ImportMeta {
  url: string
  hot: ImportMetaHot
  env: {
    MODE: 'development' | 'production'
  }
}

declare interface ProcessEnv {
  NODE_ENV: 'development' | 'production'
  DB_URI: string
}
