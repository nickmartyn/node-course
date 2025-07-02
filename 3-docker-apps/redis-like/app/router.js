import { storage } from './storage.js';

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

export async function init(req, res) {
  
  if (req.method === 'GET' && req.url.startsWith('/get')) {
    const url = new URL(req.url, `http://127.0.0.1:4000`);
    const key = url.searchParams.get('key');
    const value = storage.get(key);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ value }));
  } 

  if (req.method === 'POST' && req.url === '/set') {
    
      try {
        const data = await bodyJSON(req);
        const { key, value } = data;

        if (!key || !value) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Key and value are required' }));
        }
        console.log('Setting key:', key, 'with value:', value);
        storage.set(key, value);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (error) {
        console.error(error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    };
}