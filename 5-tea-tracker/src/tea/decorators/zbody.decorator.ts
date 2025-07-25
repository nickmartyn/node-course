import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { z } from 'zod';

export const ZBody = createParamDecorator(
  async (schema: z.Schema, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const body = request.body;

    try {
      await schema.parseAsync(body);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        let messages: string[] | null = null;
        if (error.errors && error.issues.length > 0) {
          messages = error.issues.map((e) => e.message);
        }
        throw new BadRequestException(
          'Validation error: ' + messages?.join(', '),
        );
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred during validation.',
      );
    }
    return body;
  },
);
