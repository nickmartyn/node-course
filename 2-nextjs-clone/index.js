import { createServer } from 'node:http';
import * as router from './lib/router.js';
import { MainController } from './controllers/main.controller.js';

const hostname = '127.0.0.1';
const port = 3000;

await MainController();

const server = createServer((req, res) => {
  router.handle(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});