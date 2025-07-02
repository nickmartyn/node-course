import { createServer } from 'node:http';
import { init } from './router.js';

const hostname = '0.0.0.0';
const port = 4000;

const server = createServer((req, res) => {
  init(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});