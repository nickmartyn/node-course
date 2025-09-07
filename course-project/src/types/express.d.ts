import { AuthorizedUser } from './authorizedUser.interface';

declare module 'express' {
  interface Request {
    account?: AuthorizedUser;
  }
}
