
## Description

Social network powered by NestJS & PostgreSQL

This project is a mini social network backend. Users can register, log in, create posts, and view posts by user or query filter.

## Features

- **User Registration & Authentication:**  
  Users can sign up and log in using JWT-based authentication.

- **Post Management:**  
  Authenticated users can create, update, and delete their own posts.

- **User & Post Query:**  
  Anyone can view users and filter posts by user.

- **Caching:**  
  Redis is used to cache user posts for faster retrieval.

  ## API Endpoints

### Auth

Swagger URL: http://localhost:4444/docs

- `POST /auth/token` — Log in and receive JWT token

### Users

- `GET /users/:id` — Get user by ID (protected)
- `POST /users` — Create user (public)
- `PUT /users/:id` — Update user (protected, only self)
- `DELETE /users/:id` — Delete user (protected, only self)

### Posts

- `GET /posts` — Get all posts (optionally filter by user)
  - Query params: `userId`,
- `GET /posts/:id` — Get post by ID
- `POST /posts` — Create a new post (authenticated)
- `PUT /posts/:id` — Update a post (authenticated, only owner)
- `DELETE /posts/:id` — Delete a post (authenticated, only owner)


## Database

- **PostgreSQL** is used as the main database.
- **Entities:**
  - **User:**  
    - `id` (PK), `firstName`, `lastName`, `email`, `passwordHash`, `isActive`
    - One-to-many relation to posts
  - **Post:**  
    - `id` (PK), `title`, `hashtag`, `isPublished`, `content`, `userId` (FK)
    - Many-to-one relation to user



## Project setup

```bash
$ npm install
```

### Create and set .env file - see examples in .env.example


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

```bash
docker-compose up
```

## Config

Create a `.env` file with the following variables:

```
APP_PORT=4444
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

## Tech Stack

- NestJS
- PostgreSQL
- TypeORM
- Redis (for caching)
- JWT (for authentication)
- Docker support

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```


## App Usage

App URL: http://localhost:4444

