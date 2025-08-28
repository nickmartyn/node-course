
## Description

Images Zip arhive extractor and thumbnails generator.   
Powered by Nest.js

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage

Server base url: http://localhost:3000  
  
Endpoint path: /zip  
  
Method: POST  

```bash
curl -F "file=@/path/to/your/file.zip" http://localhost:3000/zip
```