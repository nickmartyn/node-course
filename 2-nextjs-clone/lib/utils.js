import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

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
