import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateDebtController from '../controllers/CreateDebtController';
import DeleteDebtController from '../controllers/DeleteDebtController';
import ListDebtorsDebtsController from '../controllers/ListDebtorsDebtsController';
import ListDebtsController from '../controllers/ListDebtsController';
import ShowDebtController from '../controllers/ShowDebtController';
import UpdateDebtController from '../controllers/UpdateDebtController';

const createDebtController = new CreateDebtController();
const deleteDebtController = new DeleteDebtController();
const listDebtorsDebtsController = new ListDebtorsDebtsController();
const listDebtsController = new ListDebtsController();
const showDebtController = new ShowDebtController();
const updateDebtController = new UpdateDebtController();

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

debtRouter.get('/list', ensureAuthenticated, listDebtsController.list);
debtRouter.get(
  '/show/:debt_id',
  celebrate({
    [Segments.PARAMS]: {
      debt_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  showDebtController.show
);

debtRouter.put(
  '/update/:debt_id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      debtor_id: Joi.string(),
      debt_reason: Joi.string(),
      value: Joi.number(),
    },
    [Segments.PARAMS]: {
      debt_id: Joi.string().required(),
    },
  }),
  updateDebtController.update
);

debtRouter.get(
  '/list/debtor/:debtor_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      debtor_id: Joi.string().required(),
    },
  }),
  listDebtorsDebtsController.list
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
