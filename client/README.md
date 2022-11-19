
# Taskie Client
React client of Taskie
> ⚠️ Instructions are provided for yarn. If you are using npm, replace the `yarn` commands with `npm run` commands

## Prerequisite
- NodeJS

## Usage
### Install dependencies
```
yarn install
```

### Update .env
- `VITE_API_BASE_URL` - base url of the Taskie server (eg: http://localhost:8888/api/v1)


### Run dev server
```
yarn dev
```
> I advice to run the dev server on a specific port and whitelist that port from the server side in order to allow cors.
```
yarn dev -- --port 3000
```

### Run tests
- Update `ADMIN_SECRET` variable in `cypress.config.ts` excatly as in the server `server/.env.test`
- Update `ABI_BASE` variable in `cypress.config.ts` to match the server address (eg: http://localhost:8888/api/v1)
- Update `baseUrl` variable in `cypress.config.ts` to match the client address (eg: http://127.0.0.1:3001) 
> ⚠️ You must run the server using test environment when running tests (server -> `yarn test:run`). Otherwise it will throw
```
yarn cy:run
```