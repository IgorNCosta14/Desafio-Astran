# Astran-challenge - backend

## Description

An API to search for information and the history of stocks, as well as having the functionality to compare and project the profit from the sale of stocks.

<br>

# Installation

Install all dependencies.

```bash
$ yarn
```

<br>

# App

## Running for the first time

The project can be runned with Docker.

First, build the project from the docker-compose file.

```bash
# build project
$ yarn docker
```

Enter the app container console to be able to run others commands.

```bash
# enter container console
$ docker exec -it app bash
```

Then run database migrations to create tables and relations.

```bash
# run migrations
$ yarn run-migrations
```

## Running the app

```bash
# development
$ yarn docker

# watch mode
$ yarn start:dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test
```