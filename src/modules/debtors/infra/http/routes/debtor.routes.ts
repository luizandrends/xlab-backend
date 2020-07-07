import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateDebtorController from '../controllers/CreateDebtorController';

const createDebtorController = new CreateDebtorController();

const debtorRouter = Router();

debtorRouter.post(
  '/create',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      cpf: Joi.string().required(),
    },
  }),
  createDebtorController.create
);

export default debtorRouter;
