import { createUser, getAllUsers, getUser, searchUsers } from '../controllers/user.controller.js';
import {
  createUserSchema,
  searchUsersQuerySchema,
  userIdParamsSchema,
} from '../validation/user.schema.js';
import { asyncHandler, validateRequest } from '@micro-chat/common';
import { Router } from 'express';

export const userRoutes: Router = Router();

userRoutes.get('/', asyncHandler(getAllUsers));
userRoutes.get(
  '/search',
  validateRequest({ query: searchUsersQuerySchema }),
  asyncHandler(searchUsers),
);
userRoutes.get('/:id', validateRequest({ params: userIdParamsSchema }), asyncHandler(getUser));
userRoutes.post('/', validateRequest({ body: createUserSchema }), asyncHandler(createUser));
