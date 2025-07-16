import { z } from 'zod';
import { registry } from '../openapi/registry.js';

export const BrewDTO = z.object({
  beans: z.string().min(3).max(40).describe("Beans or blend name"),
  method: z.enum(["v60", "aeropress", "chemex", "espresso"]).describe("Brewing method"),
  rating: z.number().min(1).max(5).describe("Rating from 1 to 5"),
  notes: z.string().max(200).optional().describe("Optional notes about the brew"),
  brewedAt: z.string().datetime().describe("Date and time when the brew was made")
});

registry.register('Brew', BrewDTO);