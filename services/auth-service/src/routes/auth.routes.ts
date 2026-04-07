import { registerHandler } from '@/controllers/auth.controllers.js';
import { validateRequest } from '@micro-chat/common';
import { Router } from 'express';

export const authRouter: Router = Router();

authRouter.post('/register', validateRequest({}), registerHandler);
