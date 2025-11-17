import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';

import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const userRouter = Router();

// Get all users (public safe version)
userRouter.get('/', getUsers);

// Get single user (owner only)
userRouter.get('/:id', authorize, getUser);

// Update user (owner only)
userRouter.put('/:id', authorize, updateUser);

// Delete user (owner only)
userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;
