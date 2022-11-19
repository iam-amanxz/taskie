
# Taskie Server

Node server of Taskie

> ⚠️ Instructions are provided for yarn. If you are using npm, replace the `yarn` commands with `npm run` commands

## Prerequisite
- NodeJS v16+
- PostgreSQL
> ⚠️ if you are using Docker you can run `docker compose up` which will open up a Postgres container at port `5432`

  

## Usage
### Install dependencies
```
yarn install
```

### Update ENV variables for the appropriate environment
> Create separate .env files for the environment you want to run the project in (`.env.development` and `.env.test`)

#### ENV Reference
- `NODE_ENV` - node js environment ( eg: development / test)
- `DATABASE_URL` - postgres database url (Eg: postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public)
- `EMAIL_ADDRESS` - gmail address to use as the smtp server for sending task overdue emails
- `EMAIL_PASSWORD` - password for the gmail account
- `EMAIL_ADDITIONAL_HOURS` - how many hours after the task expiration should the email send (Eg: 3)
- `CORS_DOMAINS` - frontend domains to whitelist (eg: http://localhost:3001, http://127.0.0.1:3001)
- `JWT_SECRET` - secret to generate JWT tokens (eg: MYSUPERSECRET)
- `ADMIN_SECRET` - secret to access admin routes. This is only for cypress testing on the client and this same secret string must be registered on the `client/cypress.config.ts` as well (eg: MYSUPERADMINSECRET)

  

### Create dev and test databases
Create two new Postgres databases one for dev and another for test and update the database url in the `.env.development` and `.env.test` files

### Run dev server
> Properly update the `.env.development` before running this
```
yarn migrate:dev // run database migrations
```
```
yarn dev
```

### Run tests
> Properly update the `.env.test` before running this
```
yarn migrate:test // run database migrations
```
```
yarn test
```