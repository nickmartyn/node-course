import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

export function ZBody(schema: z.ZodSchema) {
  return createParamDecorator(
    async (_data: unknown, ctx: ExecutionContext): Promise<any> => {
      const req = ctx.switchToHttp().getRequest<Request>();
      try {
        return await schema.parseAsync(req.body);
      } catch (e) {
        throw new BadRequestException(
          e instanceof z.ZodError
            ? e.issues.map((i) => i.message).join(', ')
            : 'Validation error',
        );
      }
    },
  )();
}
