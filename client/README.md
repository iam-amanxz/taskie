
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
- `VITE_API_BASE_URL` - base url of the Taskie server (eg: http://localhost:8000/api/v1)


### Run dev server
> Server is set to run at port 3000. if you change this, make sure to whitelist the address on the server .env variables (`CORS_DOMAINS`)
```
yarn dev
```

### Run tests
- Update `ADMIN_SECRET` variable in `cypress.config.ts` excatly as in the server `server/jest.config.js`
- Update `ABI_BASE` variable in `cypress.config.ts` to match the server address (eg: http://localhost:8000/api/v1)
- Update `baseUrl` variable in `cypress.config.ts` to match the client address (eg: http://127.0.0.1:3000) 
> ⚠️ You must run the server using test environment when running tests (server -> `yarn test:run`). Otherwise it will throw
```
yarn cy:run
```