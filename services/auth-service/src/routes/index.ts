import { Router } from 'express';
import { authRouter } from './auth.routes.js';

export const registerRoutes = (app: Router) => {
  app.use('/auth', authRouter);
};
