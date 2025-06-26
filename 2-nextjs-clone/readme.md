# Node.js Nextjs clone

> Database: `database.json`  
> Architecture: Controller -> Service -> Model  
> Dynamic Routes based on directories located in /routes directory  

## Project structure

```
2-nextjs-clone/
├─ package.json              # "type": "module"
├─ index.js                  # entrypoint
├─ controllers/
│   └─ main.controller.js    # main controller
├─ services/
│   └─ habit.service.js      # business logic
├─ models/
│   └─ habit.model.js        # work with file & db
├─ routes/
│   └─ post
      └─ [id]
        └─ route.js          # dynamic routes endpoints definition
├─ lib/
│   └─ router.js             # work with file & db
│   └─ utils.js              # utils for router, controllers and db
└─ database.json             # database \[ { routeName: [] } ]
````

## How to Use

### Install
```
1) npm install
2) npm run start
```

### Work with api

Url: http://localhost:3000/posts  

Implemnted methods: 

GET | PUT | DELETE http://localhost:3000/posts/:id // work with a single post  
GET http://localhost:3000/posts // list all posts  