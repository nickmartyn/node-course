
FROM nickmart/node:latest AS builder

USER node
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY src ./src
COPY build.mjs .

RUN npm run build

FROM nickmart/node:latest

WORKDIR /app
USER node

COPY --from=builder  /app/dist/server.mjs ./server.mjs


EXPOSE 3000

CMD ["node","./server.mjs"]