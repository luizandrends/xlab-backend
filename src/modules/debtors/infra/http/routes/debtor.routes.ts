import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateDebtorController from '../controllers/CreateDebtorController';
import DeleteDebtorController from '../controllers/DeleteDebtorController';

const createDebtorController = new CreateDebtorController();
const deleteDebtorController = new DeleteDebtorController();

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

debtorRouter.delete(
  '/delete/:debtor_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      debtor_id: Joi.string().required(),
    },
  }),
  deleteDebtorController.delete
);

export default debtorRouter;
