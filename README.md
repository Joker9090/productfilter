## Product Filter


## Demo link 
[Demo](https://productfilter.vercel.app/)

## Concept Diagram
![DiagramImage](https://github.com/Joker9090/productfilter/blob/master/public/baseDiagramConcept.png?raw=true)


## Stack
- node 16.13.1
- Next
- React
- Redux
- Typescript
- Cypress
- styled
- Docker
- [Intermock](https://github.com/google/intermock)


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
NEXT_PUBLIC_VAR=
```

## TO IMPROVE
- More Test Cases  
- Shimmers in more things
- Blem Modal UI
- Image Optimization  


## Coments 
- The Mock Service is in service.tsx file > Inside there is a Class ServiceApi who works as a singleton { GetProductPromise, GetProductsPromise} 
- Running `make mock` will generate new 9 mocked files inside mock folder, but I change image src for make ProductRow prittier
- In ProductRow I use `Array.from(new Set([category, ...subCategories].map(i => i.type)))` to make sure of dont have a duplicate category|subcategory
- The General Idea was handle 2 differents groups of products { SERVER-PRODUCTS & LOCAL-PRODUCTS } >
```SERVER-PRODUCTS => Products from endpoint
LOCAL-PRODUCTS => Products from localStorage, this products can be deleted, the otherones no.
```
- The data is persisted in localStorage. Saving an edit or create a new registry will create a new localStorage data to persist this change. If you want to view this data, just filter for LOCAL in the server type filter.
- All handmade components, No extra dependecies!! {Selector || Buttons}
- There is a icon-cog up in the right corner to change layout !

## Learn More
- Time-Spent = 14 hours
- Time-Spent-pretends = 12 hours

