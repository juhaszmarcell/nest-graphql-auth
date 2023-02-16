# nest-graphql-auth

This repository is a skeleton nestjs app featuring with graphql, prisma and postgresql.

---

## Installation

```bash
$ npm install
```

## Configuration

```bash
Rename .env.example to .env. Modify database url and your secret.
```

## Scripts to running the app

```bash
# prisma generate
npm run db:generate

# start database
$ npm run start_env:postgres

# clean database
$ npm run clean_env:postgres

# db migration
$ npm run db:migrate:dev | prod

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Good to know

The graphql endpoint at http://localhost:3000/graphql.
Cors is enabled and need to configure if you want to use with your client.
The application got health check module at http://localhost:3000/api with swagger.

## Author

Marcell Juhasz
