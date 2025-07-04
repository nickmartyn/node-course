import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readdir } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB = join(__dirname, '..', 'database.json');

export async function readData() {
  const raw = await readFile(DB, 'utf8');
  return JSON.parse(raw);
}

export async function saveData(data) {
  return writeFile(DB, JSON.stringify(data, null, 2));
}

export function bodyJSON(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      try   { resolve(JSON.parse(raw || '{}')); }
      catch { reject(new Error('Invalid JSON')); }
    });
  });
}

export const getDynamicParams = async (path, ROUTES_PATH) => {
  const dynamicParams = []
  const directories = await readdir(`${ROUTES_PATH}/${path}`,  { withFileTypes: true });
  for (const dir of directories) {
    if (dir.isDirectory() && new RegExp().test(dir.name, /^\[[a-zA-Z]+\]$/)) {
      dynamicParams.push(dir.name);
    }
  }
  return dynamicParams;
}

export const successResponse = (res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export const successResponseBasic = (res, status = 200,  message) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(message));
}

export const notFoundResponse = (res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Post not found' })); 
}

export const errorResponse = (res, status = 500, message = 'Internal Server Error') => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message || 'Internal Server Error' }));
}
