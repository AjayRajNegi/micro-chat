import { registerHandler } from '@/controllers/auth.controllers.js';
import { validateRequest } from '@micro-chat/common';
import { Router } from 'express';
import { registerSchema } from './auth.schema.js';

export const authRouter: Router = Router();

authRouter.post('/register', validateRequest({ body: registerSchema.shape.body }), registerHandler);
