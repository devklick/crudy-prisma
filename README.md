# Crudy Prisma

This is an API written in TypeScript, which utilises:
- NX Workspace monorepo 
- Express as the API framework
- Zod for schema parsing & validation
- Prisma as an ORM
- Autmapper to map between API and DB objects
- Postgres as the data store

## Purpose 
It's purpose is purely for eduction and fun - I wanted to experiment with the technologies mentioned above.

## The application
The app is/will be a simple to-do list, where users can register accounts to create and track to-do's. At the time of writing this, it's simply an API with a couple of enpoints and a DB with a couple of tables.

# Getting started
You will need a Postgres DB instance - see [Postgres Instructions](https://www.postgresql.org/download/) (or you can try teaking the `prisma.schema` to use a different DB server).
After cloning/forking the code, you'll need an `.env` file with the following variables:
| Name     | Type     | Description             | Example                 | Default                 |
|----------|----------|-------------------------|-------------------------|-------------------------|
| PORT | Integer | The port the API listen on for requests | 3000 | 3023 |
| DATABASE_URL | String | The URL of the database as required by Prisma. See [Postgresql Database Connectors](https://www.prisma.io/docs/concepts/database-connectors/postgresql) | `postgresql://dbuser:dbpassword@localhost:5432/todo`
| SYSTEM_USER_PASSWORD | String | A "system" user will be automatically added to the DB in a later step. This variable specifies the password for the system user. | `S00perS3cretP4ssw()rd!` | |
| JWT_SECRET | String | A secret key that will be used to sign and verify JWT's | `83TT3R_M4k3it_4G00d1` | |

Now you have your environment variables set up, it should just be a case of installing the package:
```
npm i
```
Installing the package also creates the database & tables etc, and seed any data (such as our system user).

Finally, it should just be a case of running the development server:
```
npm run dev
```