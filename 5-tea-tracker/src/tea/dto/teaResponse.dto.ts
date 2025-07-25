import { Tea } from '../tea.entity';
import { createZodDto } from '@anatine/zod-nestjs';

import { z } from 'zod';

export interface TeaResponseDTO {
  data: Tea[];
  total: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export const TeaResponseSchema = z.object({
  data: z.array(z.instanceof(Tea)),
  total: z.number().optional(),
  pageSize: z.number().optional(),
  currentPage: z.number().optional(),
  totalPages: z.number().optional(),
});

export class GetAllTeasApiResponseDTO extends createZodDto(TeaResponseSchema) {}
