import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateDebtController from '../controllers/CreateDebtController';

const createDebtController = new CreateDebtController();

const debtRouter = Router();

debtRouter.post(
  '/create',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      debtor_id: Joi.string().required(),
      debt_reason: Joi.string().required(),
      date: Joi.date().required(),
      value: Joi.number().required(),
    },
  }),
  createDebtController.create
);

export default debtRouter;
