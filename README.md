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
- ![Intermock](https://github.com/google/intermock)


## intermock
Mocked data generated With intermock 

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
- Colors
- Images
- Modal For Editing
- Modal For Create
- Positibility of delete LOCAL-PRODUCTS
- Positibility of save LOCAL-PRODUCTS
- Positibility of edit LOCAL-PRODUCTS
- Test Cases  
- Layout Options [
  LEFT, CENTER, FULL SCREEN
  - sort of dashboard concept in the back
]

## Coments 
- The Mock Service is in service.tsx file > Inside there is a Class ServiceApi who works as a singleton { GetProductPromise, GetProductsPromise} 
- Running `make mock` will generate new 9 mocked files inside mock folder, but I change image src for make ProductRow prittier
- In ProductRow I use `Array.from(new Set([category, ...subCategories].map(i => i.type)))` to make sure of dont have a duplicate category|subcategory
- The General Idea was handle 2 differnts groups of products { SERVER-PRODUCTS & LOCAL-PRODUCTS } >
```SERVER-PRODUCTS => Products from endpoint
LOCAL-PRODUCTS => Products from localStorage, this products can be deleted, the otherones no.
```

## Learn More
- Time-Spent = 10 hours
- Time-Spent-pretends = 12 hours

