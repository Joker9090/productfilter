## Product Filter


## Demo link 
[Demo](https://Wait-Link/)


## Concept Diagram
![DiagramImage](https://Wait-Link/)

## Stack
- node 16.13.1
- Next
- React
- Redux
- Typescript
- Cypress
- styled
- Docker

## linter
There is a eslinter config for a pretty code =)

## requirements
- Docker
- nvm
- yarn

## Testing
There is a Cypress implementation
the test files are located in cypress/integration folder

```js
  "cypress": "cypress open",
  "cypress:headless": "cypress run",
  "e2e": "start-server-and-test dev http://localhost:3000 cypress",
  "e2e:headless": "start-server-and-test dev http://localhost:3000 cypress:headless"
```

## Getting Started
First, run the development server:
[requirements ( at least one ), NVM || YARN || DOCKER ]
```js
  nvm use  
  npm install
  npm run dev
  # or
  yarn dev
  # or
  make start
  # or
  docker-compose up -d --build
```

## Configure Env File
Create a local .env file with the following variables
```
NEXT_PUBLIC_API_URI=
```

## TO IMPROVE


## Coments 
- 
- 

## Learn More
- Time-Spent = 3 hours
- Time-Spent-pretends = 12 hours

