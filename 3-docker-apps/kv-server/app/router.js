
const { REDIS_URL } = process.env;

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

async function fetchData(method, key, value) {

  const path = method === 'GET' ? '/get' : '/set';
  const redisURL = new URL(path, REDIS_URL);

  if (method === 'GET') {
    redisURL.searchParams.set('key', key);
  }

  const response = await fetch(redisURL, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...( method === 'POST' && { body: JSON.stringify({ key, value }) }),
  });
  const data = await response.json();

  return data;
}

export async function init(req, res) {
  
  if (req.method === 'GET' && req.url.startsWith('/kv')) {
    const url = new URL(req.url, `http://0.0.0.0:3000`);
    const key = url.searchParams.get('key');

    const value = await fetchData('GET', key);

    if (value) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(value));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Key not found' }));
    }
  } 

  if (req.method === 'POST' && req.url === '/kv') {
    
      try {
        const data = await bodyJSON(req);
        const { key, value } = data;

        if (!key || !value) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Key and value are required' }));
        }

        await fetchData('POST', key, value);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (_error) {
        console.error('Error processing request:', _error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON format' }));
      }
    };
}