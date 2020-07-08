import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthenticateUserController from '../controllers/AuthenticateUserController';

const authenticateUserController = new AuthenticateUserController();

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.create
);

export default sessionsRouter;
