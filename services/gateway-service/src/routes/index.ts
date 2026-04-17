import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';

export const registerRoutes = (app: Router) => {
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'gateway-service' });
  });

  app.use('/auth', authRouter);
  app.use('/users', userRouter);
};
