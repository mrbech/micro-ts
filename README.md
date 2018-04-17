# Micro Typescript
An example REST API implemented in Typescript using [`micro`](https://github.com/zeit/micro)

Currently has an attempt at routing and endpoint body validation.
Desired features includes:

- Database setup including migrations, could be done using [sequelizejs](http://docs.sequelizejs.com/)
- Endpoint documentation generation, could be done using
  [apidocjs](http://apidocjs.com/)
- Code documentation generation, could be done using
  [typedoc](http://typedoc.org/)

## Setup
First install dependencies locally with:

> docker-compose run backend yarn install

Then setup using

> docker-compose up

The server will run on port `3000` and reload on code changes. New dependencies
can be added by running:

> docker-compose run backend yarn add <dependency>

## JSON Schema
For endpoint validation we use JSON schemas generated from typescript
interfaces. The generated schema can be found in `lib/models/schemas.json` and
is generated from the typescript files found in lib/models using:

> docker-compose run backend yarn run json-schema 
