import { LoggedInUser } from '../../auth/auth.interface';

declare global {
  namespace Express {
    export interface Request {
      user?: LoggedInUser;
    }
  }
}

export {};
