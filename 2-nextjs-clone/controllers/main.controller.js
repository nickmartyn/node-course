
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readdir } from 'node:fs/promises';
import * as router from '../lib/router.js';
import { getDynamicParams } from '../lib/utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROUTES_PATH  = join(__dirname, '..', 'routes');

export async function MainController() {
  try {
    const directories = await readdir(ROUTES_PATH,  { withFileTypes: true });
    for (const dir of directories) {
        if (dir.isDirectory()) {

          const dynamicParamsList = await getDynamicParams(dir.name, ROUTES_PATH);

          if (dynamicParamsList.length > 0) {
            for (const dynamicParam of dynamicParamsList) {
              const routePath = join(ROUTES_PATH, dir.name, dynamicParam, 'route.js');
              const route = await import(routePath);

              if (typeof route === 'object' && route !== null) {
                Object.keys(route).forEach(method => {
                  router.addRoute(method, `/${dir.name}`, dynamicParam.replace(/\[|\]/g, ''), route[method]);
                });
              }
            }
          }
        }
    }
  } catch (err) {
    console.error(err);
  }
}