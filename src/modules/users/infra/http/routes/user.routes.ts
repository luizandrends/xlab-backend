import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateUserController from '../controllers/CreateUserController';

const createUserController = new CreateUserController();

const userRouter = Router();

userRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    },
  }),
  createUserController.create
);

export default userRouter;
