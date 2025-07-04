
const routes = [];

function addRoute(method, path, dynamicParam, handler) {
    routes.push({ method: method.toUpperCase(), path, dynamicParam, handler });
}

function handle(req, res) {
    const urlPath = req.url;
    for (const route of routes) {
        if (route.method === req.method && urlPath.startsWith(route.path)) {
          const params = {};
          if (urlPath.split('/').length > 2) {
              // Extract params if present
              params[route.dynamicParam] = urlPath.split('/')[2];
          }
          // Attach params to req
          req.params = params;
          return route.handler(req, res);
        }
    }
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Implemented' }));
}

export { addRoute, handle };