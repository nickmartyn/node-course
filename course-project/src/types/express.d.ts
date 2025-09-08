import { AuthorizedUser } from './authorizedUser.interface';

declare module 'express' {
  interface Request {
    user?: AuthorizedUser;
  }
}
