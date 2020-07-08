import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateDebtController from '../controllers/CreateDebtController';
import DeleteDebtController from '../controllers/DeleteDebtController';

const createDebtController = new CreateDebtController();
const deleteDebtController = new DeleteDebtController();

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

debtRouter.delete(
  '/delete/:debt_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      debt_id: Joi.string().required(),
    },
  }),
  deleteDebtController.delete
);

export default debtRouter;
