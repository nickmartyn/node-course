
const routes = [];

function addRoute(method, path, handler) {
    // Convert path pattern to regex and extract param names
    const paramNames = [];

    const regexPath = path.replace(/:([^/]+)/g, (_, key) => {
        paramNames.push(key);
        return '([^/]+)';
    });

    const regex = new RegExp(`^${regexPath}$`);
    routes.push({ method: method, regex, paramNames, handler });
}

function handle(req, res) {
    const urlPath = req.url.split('?')[0];
    for (const route of routes) {
        if (route.method === req.method) {
            console.log('Matching method:', route.method);
            const match = urlPath.match(route.regex);
            const params = {};
            if (match) {
                // Extract params if present
                route.paramNames.forEach((name, idx) => {
                    params[name] = match[idx + 1];
                });
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