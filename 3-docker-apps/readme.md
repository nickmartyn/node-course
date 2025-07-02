# Docker for API services


## Base Image

DOCKER HUB URL: `https://hub.docker.com/r/nickmart/node`

Dockerfile: `./Dockerile`  

Build command: 
`docker build -t nickmart/node .`

Push:
// log in to docker hub first  
`docker push -a nickmart/node`

Pull commands:  
`docker pull nickmart/node`   
`docker pull nickmart/node:latest`   


## APPS

run command:  
`docker-compose up`

### KV-server

Port: 3000 -> 8080

Open app at http://0.0.0.0:8080

### REDIS-like

Port: 4000


### KV-server hot reload

#### Build

docker build -f kv-server/Dockerfile.kv.dev  -t hot-reload:dev .

#### Run and mount app directory

```
docker run -it --rm -v "$(pwd)/kv-server/app:/src/app" -p 8080:3000 --name hot hot-reload:dev
```

