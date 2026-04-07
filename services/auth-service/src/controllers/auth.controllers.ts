import { register } from '@/services/auth.service.js';
import { RegisterInput } from '@/types/auth.js';
import { asyncHandler } from '@micro-chat/common';
import { RequestHandler } from 'express';

export const registerHandler: RequestHandler = asyncHandler(async (req, res, next) => {
  const payload = req.body as RegisterInput;
  const tokens = await register(payload);

  res.status(200).json(tokens);
});
