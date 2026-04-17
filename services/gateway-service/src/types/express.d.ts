import type { AuthenticatedUser } from '@micro-chat/common';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
