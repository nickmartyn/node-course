# Cofee Brew API (node.js, express)

Coffee Brew tracking app for professional baristas.  

> Architecture: Route -> Controller -> Service -> Model  
> Dependency Injection Container via Awilix to organize app with modules structure  
> Endpoint payload validation with Zod schemas  
> dotenv configuration  
> in-memory storage  
> Swagger API documentation  
> ESbuild  
> ESlint  


## Project structure

```
2-nextjs-clone/
├─ src/
    └─ brewDTO.js                 # brew route definitions
    ├─ server.js                  # server
    ├─ app.js                     # main app create helper
    ├─ docs/                      # swagger config
    ├─ openapi                    # api docs registry config

    ├─ config/                    # dotenv config
    ├─ server.js                  # entrypoint
    ├─ middlewares/  
    ├─ dto/
    │   └─ brewDTO.js             # brew route definitions
    ├─ routes/
    │   └─ brews.routes.js        # brew route definitions
    ├─ controllers/
    │   └─ brews.controller.js    # main controller
    ├─ services/
    │   └─ brews.service.js      # business logic
    ├─ models/
    │   └─ brews.model.js        # work with file & db
    ├─ utils/
    |- .env.example
  |- build.mjs
  |- Dockerfile
  ├─ package.json               # "type": "module"
````

## How to Use

### Development
```
1) npm install
2) npm run start

# ES build version
1) npm run build
2) npm run start-prod

#linting
npm run lint
```

### Run with Docker

1) Build image `docker build -t brew-api .`
2) Run image from commandline `docker run -p 3000:3000 brew-api`

### Work with api

Url: http://localhost:3000/api/brews  

Implemented methods: 

GET | PUT | DELETE http://localhost:3000/api/brews/:id // work with a single post  
GET http://localhost:3000//api/brews   // list all posts  
GET http://localhost:3000//api/brews?ratingMin=5 // list all posts and apply query filter  
POST http://localhost:3000/api/brews   // add posts  

### Swagger API docs site
http://localhost:3000/docs 