# Astran-challenge

## About

A fullstack project made for the [Astran-challenge](https://github.com/Astransat/Desafio-Astran).
<br><br>
The project's Backend was made using [Node.js](https://nodejs.org/en/) and [Express.js](https://expressjs.com/), the tests were done with [Jest](https://jestjs.io/). The frontend was made with [React.js](https://reactjs.org/) and [TailwindCSS](https://tailwindui.com/).

Both frontend and backend have README explaining its use.

# Running the project

Both projects use yarn as the package manager.

```bash
# Install yarn
$ npm install --global yarn
```

## Backend

First navigate to `api` folder then run the docker script.

```bash
# change directory
$ cd api

# build project
$ docker-compose up
```

It should be running on `http://localhost:3333`

<br>

## Frontend

To start the application, navigate to `web` folder and run the start script.

```bash
# on project root folder
$ cd web

# install dependencies
$ yarn

# start script
$ yarn dev
```

# API routes and examples

## Find stock by name

```
// get http://localhost:3333/stocks/:stock_name/quote

input:

"stock_name": "IBM"
```

## Get stock historic
```
// get http://localhost:3333/stocks/:stock_name/history?from=<string>&to=<string>

input:

"stock_name": "IBM"
"from": "2017-04-01" 
"to": "2017-04-15"
```

## Compare stocks
```
// post http://localhost:3333/stocks/:stock_name/compare

input:

"stock_name": "IBM"

Payload JSON:

{
  "stocks": ["PETR4.SA", "VALE5.SA"]
}
```

## Get gains projection
```
// get http://localhost:3333/stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>

input:

"stock_name": "IBM"
"purchasedAmount": 100
"purchasedAt": "2017-04-01"
```