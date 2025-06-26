
import { fileURLToPath } from 'node:url';
import * as router from '../lib/router.js';
import { dirname, join } from 'node:path';
import { readdir } from 'node:fs/promises';


const __dirname = dirname(fileURLToPath(import.meta.url));
const ROUTES_PATH  = join(__dirname, '..', 'routes');

export async function MainController() {
  try {
    const directories = await readdir(ROUTES_PATH,  { withFileTypes: true });
    for (const dir of directories) {
        if (dir.isDirectory()) {
            const routePath = join(ROUTES_PATH, dir.name, '[id]', 'route.js');
            
            const { route } = await import(routePath);

            if (typeof route === 'object' && route !== null) {
              Object.keys(route).forEach(method => {
                router.addRoute(method, `/${dir.name}/:id`, route[method]);
              });
            }
        }
    }
  } catch (err) {
    console.error(err);
  }
}