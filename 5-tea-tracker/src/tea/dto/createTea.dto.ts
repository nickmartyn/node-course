import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateTeaSchema = z
  .object({
    name: z.string().min(3).max(40),
    origin: z.string().min(2).max(30),
    rating: z.number().min(1).max(10).optional(),
    brewTemp: z.number().min(60).max(100).optional(),
    notes: z.string().min(0).max(150).optional(),
  })
  .strict();

export type CreateTeaDTO = z.infer<typeof CreateTeaSchema>;
export class ApiCreateTeaDTO extends createZodDto(CreateTeaSchema) {}
