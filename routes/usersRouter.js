import express from 'express';
import validateBody from '../helpers/validateBody.js';
import {
  createUserSchema,
  updateUserSubscriptionSchema,
  loginUserSchema,
} from '../schemas/userSchemas.js';
import auth from '../helpers/auth.js';

import { register } from '../controllers/usersControllers.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(createUserSchema), register);

export default usersRouter;
