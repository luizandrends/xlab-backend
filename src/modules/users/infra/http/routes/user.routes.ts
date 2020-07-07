import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateUserController from '../controllers/CreateUserController';
import UpdateUserController from '../controllers/UpdateUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

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

userRouter.put(
  '/update',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  updateUserController.update
);

export default userRouter;
