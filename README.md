# Scaling Octo Funicular

Client app is built using React and TypeScript. Bundled using [Snowpack](https://snowpack.dev)

Server app is built using Node.js (ECMAScript modules), Express, and MongoDB

Authentication is handled by JWT

## Prerequisites

1. Node.js, npm
1. Accessible MongoDB database with following collections:
   - `accounts` - user accounts, admin must be populated with password hashed by `bcrypt`
   - `people` - to be filled with person form submissions
1. `.env` file with all required entries. See `./.env.example` for details

## Project structure

- `client/*` - client app sources
  - `components/*` - reusable UI components
  - `hooks/*` - hook facades over certain React-specific aspects/logic
  - `pages/*` - page components with common props as `PageProps` type
  - `services/*` - facades over certain Web APIs
  - `app.tsx` - client app shell, nav links, and routing point
  - `utils.ts` - this should not exists IRL
- `public/*` - client app static files
- `server/*` - server app sources
  - `controllers/*.mjs` - endpoint logic (actions grouped by controllers)
  - `auth.mjs` - authentication middleware and password checker
  - `cors.mjs` - CORS middleware
  - `crypto.mjs` - SSN encryption tools
  - `db.mjs` - database middleware
  - `main.mjs` - middleware and routing settings, app initialization
- `types/*.d.ts` - global type definitions
- `.env.example` - list of supported environment variables
- `snowpack.config.js` - client app bundler settings

## Development

Run `npm ci` to install all dependencies

Then, following scripts are available:

- `npm run client` starts client app with hot reload
- `npm run server` starts server app with file watcher
- `npm start` starts both scripts from above simultanousely

## Deployment

Not implemented
