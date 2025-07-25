import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateTeaSchema = z
  .object({
    name: z.string().optional(),
    origin: z.number().optional(),
    rating: z.number().optional(),
    brewTemp: z.number().optional(),
    notes: z.string().optional(),
  })
  .partial();

export type UpdateTeaDTO = z.infer<typeof UpdateTeaSchema>;
export class ApiUpdateTeaDTO extends createZodDto(UpdateTeaSchema) {}
