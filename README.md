# Micro Typescript
An example REST API implemented in Typescript using [`micro`](https://github.com/zeit/micro)

Currently has an attempt at routing and endpoint body validation.
Desired features includes:

- Endpoint documentation generation, could be done using
  [apidocjs](http://apidocjs.com/)
- Code documentation generation, could be done using
  [typedoc](http://typedoc.org/)

## Setup
First install dependencies locally with:

> docker-compose run backend yarn install

Then setup using

> docker-compose up
> docker-compose run backend yarn migrate

The server will run on port `3000` and reload on code changes. New dependencies
can be added by running:

> docker-compose run backend yarn add <dependency>

## Database
PostgresSQL using [knex](http://knexjs.org) as query builder. Knex allows us to
directly insert and fetch anonymous JS objects which we can easily type annotate
with TypeScript Interfaces.

### Migration
Knex has a build in migration tool, migrations can be found in the `migrations/`
folder and is defined in TypeScript. 

Migrations can be run using:

> docker-compose run backend yarn migrate

Migration files can be created with:

> docker-compose run backend yarn add-migration <name>

## JSON Schema
For endpoint validation we use JSON schemas generated from typescript
interfaces. The generated schema can be found in `lib/models/schemas.json` and
is generated from the typescript files found in lib/models using:

> docker-compose run backend yarn json-schema 
