import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import pino from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import { generateSpecs } from './docs/index.js';

import brewsRouter from './routes/brews.routes.js';
import { scopePerRequest } from 'awilix-express';
import { rateLimit } from 'express-rate-limit';
import { container } from './container.js';
import  { notFound } from './middlewares/notFound.js';
import { config } from './config/index.js';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(compression());
  app.use(cors());

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }));

  app.use(morgan('dev'));
  app.use(pino());
  
  app.post('/api/brews', rateLimit({
    windowMs: 60_000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false
  }))

  app.use(scopePerRequest(container));

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.use('/api', brewsRouter)

  if (config.env === 'development') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(generateSpecs()));
    console.log(`Swagger docs → ${config.baseUrl}/docs`);
  }

  app.use(notFound);

  return app;
}
