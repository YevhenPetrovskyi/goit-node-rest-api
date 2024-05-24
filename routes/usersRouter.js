import express from 'express';
import validateBody from '../helpers/validateBody.js';
import {
  createUserSchema,
  updateUserSubscriptionSchema,
  loginUserSchema,
} from '../schemas/userSchemas.js';
import auth from '../middlewares/auth.js';

import {
  register,
  current,
  logout,
  login,
  updateSubscription,
} from '../controllers/usersControllers.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(createUserSchema), register);

usersRouter.post('/login', validateBody(loginUserSchema), login);

usersRouter.post('/logout', auth, logout);

usersRouter.get('/current', auth, current);

usersRouter.patch(
  '/',
  validateBody(updateUserSubscriptionSchema),
  auth,
  updateSubscription
);

export default usersRouter;
