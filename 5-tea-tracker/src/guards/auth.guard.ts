import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import config from '../config/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  private apiKey: string;

  constructor(private reflector: Reflector) {
    this.apiKey = config().apiKey;
  }

  canActivate(ctx: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest<Request>();
    const headers = req.headers;
    if (headers?.['x-api-key'] === this.apiKey) {
      return true;
    } else {
      return false;
    }
  }
}
