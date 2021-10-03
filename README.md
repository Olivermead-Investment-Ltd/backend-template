# CREATE-BACKEND-TEMPLATE

This projects is an opinionanted way to bootstrap express API projects. It creates the project
structure, sets up typescript, installs common (essential) dependencies, sets up linting and
provides some scripts to get up and running easily.

(Hopefully it's simple and beginner friendly :) );

Make sure you have yarn and at least node 12 instaled

## Get started
First of all run
`npx create-backend-template {projectName}`
to bootstrap your project

A .env file will be created for you by default, edit it with your basic info then run:

`yarn dev`

to start your server.

## Available scripts

### Dev

This script runs your typescript code with ts node and automatically restarts the server when there
are changes to files.

`yarn dev`

### Build

This script compiles your typescript code into javascript and stores it in the build folder. if
there's not build folder, it creates one automatically for you.

`yarn build`

### Start

This runs your javascript files directly. Use this command to run your servers in production.

`yarn start`

### Migrate

Sequelize is used under the hood as an ORM & by default it's configured for postgres databases. This
command runs all your sequelize migrations. You can also use `migrate:u` to undo last migration or
`migrate:u:a` to undo all migrations

`yarn migrate`

`yarn migrate:u`

`yarn migrate:u:a`

### Model

This creates a model for you using sequelize. It accepts the model name and attributes as
parameters.

`yarn model {modelNAme} --attributes {attrib}:{type}`

N.B it similar to running:
`sequelize-cli model:generate --name {modelName} --attributes {attrib}:{type}`

### Migration

This creates a migration file for you using sequelize. It accepts the migration file name as a
parameter.

`yarn migration {create-tableName}`

N.B it similar to running: `sequelize-cli migration:create {create-tableName}`

### Deploy

This runs all the necessary commands to create a deployment.

`yarn deploy`

## Documenting
Swagger is already set up and ready to use. Just include you docs under paths in src/swagger.ts
Once done, hit /docs in your browser to see your swagger docs.

## Dependencies

The following dependencies are installed along with the project.

- axios
- compression
- cors
- date-fns
- dotenv
- express
- express-validator
- helmet
- jsonwebtoken
- nanoid
- pg
- pg-hstore
- sequelize
- sequelize-cli
- swagger-ui-express-

## Dev dependencies

- axios
- compression
- cors
- date-fns
- dotenv
- express
- express-validator
- helmet
- jsonwebtoken
- nanoid
- pg
- pg-hstore
- sequelize
- sequelize-cli
- swagger-ui-express-

## Contributing
Feel free to fork, open PRs and report issues. Any kind of feedback is appreciated.
