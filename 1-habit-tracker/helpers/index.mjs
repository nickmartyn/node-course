import { parseArgs } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function parseCommandlineArgs() {
  const config = {
    args: process.argv.slice(2), 
    allowPositionals: true,
    options: {
      name: { 
        type: 'string'
      },
      freq: { 
        type: 'string'
      },
      id: { 
        type: 'string'
      },
    }
  }

  const {
    values,
    positionals,
  } = parseArgs(config);
  return { operation: positionals[0], values };
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB = join(__dirname, '..', 'database.json');

export const read = async () => JSON.parse(await readFile(DB, 'utf8'));
export const save = async (data) =>
  writeFile(DB, JSON.stringify(data, null, 2));