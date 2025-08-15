export interface IPaginationDTO {
  offset: number;
  limit: number;
}

import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const PaginationSchema = z
  .object({
    pagination: z.object({
      offset: z.number().min(0).max(1000).default(0),
      limit: z.number().min(1).max(100).default(10),
    }),
  })
  .strict();

export type PaginationDTO = z.infer<typeof PaginationSchema>;
export class ApiPaginationDTO extends createZodDto(PaginationSchema) {}
