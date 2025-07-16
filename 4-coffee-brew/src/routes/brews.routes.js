import express from 'express';
import { makeClassInvoker } from 'awilix-express';

import { BrewDTO } from '../dto/brewDTO.js';
import { BrewsController } from '../controllers/brews.controller.js';
import { z } from 'zod';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import { registry } from '../openapi/registry.js';

import { validateParams } from "../middlewares/validateParams.js";
import { validateQuery } from "../middlewares/validateQuery.js";

const router = express.Router();
const ctl = makeClassInvoker(BrewsController);

const paramsSchema = z.object({
  id: z.string().describe('Brew id')
});

const querySchema = z.object({
  ratingMin: z.coerce.number().min(1).max(5).optional().describe('Minimum rating filter')
});

router.get('/brews',
  validateQuery(querySchema),
  ctl('getAllBrews'));
registry.registerPath({
  method: 'get',
  path: '/api/brews',
  tags: ['Brews'],
  responses: {
    200: {
      description: 'Array of brews',
      content: {'application/json': {schema: z.array(BrewDTO)}}
    }
  }
});

router.get('/brews/:id', 
  validateParams(paramsSchema),
  ctl('getBrewById'),
);
registry.registerPath({
  method: 'get',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: {params: paramsSchema},
  responses: {
    200: { description: 'Brew', content: {'application/json': { schema: BrewDTO }} },
    404:  { description: 'Brew not found' }
  }
});

router.post('/brews', 
  validate(BrewDTO),
  asyncHandler(ctl('createBrew'))
);
registry.registerPath({
  method: 'post',
  path: '/api/brews',
  tags: ['Brews'],
  request: {
    body: {required: true, content: {'application/json': {schema: BrewDTO}}}
  },
  responses: {
    201: {description: 'Created', content: {'application/json': {schema: BrewDTO}}},
    400: { description: 'Validation error' }
  }
})

router.put('/brews/:id',
  validateParams(paramsSchema),
  validate(BrewDTO),
  asyncHandler(ctl('updateBrew'))
);
registry.registerPath({
  method: 'put',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: {
    params: paramsSchema,
    body: {required: true, content: {'application/json': {schema: BrewDTO}}}
  },
  responses: {
    200: {description: 'Updated brew', content: {'application/json': {schema: BrewDTO}}},
    400: {description: 'Validation error'},
    404: {description: 'Brew not found'}
  }
})

router.delete('/brews/:id', 
  asyncHandler(ctl('deleteBrew'))
); 
registry.registerPath({
  method: 'delete',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: {params: paramsSchema},
  responses: {
    204: {description: 'Brew deleted'},
    404: {description: 'Brew not found'}
  }
})

export default router;

