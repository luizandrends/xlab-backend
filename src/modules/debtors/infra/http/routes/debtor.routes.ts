import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateDebtorController from '../controllers/CreateDebtorController';
import ListDebtorsController from '../controllers/ListDebtorsController';
import ShowDebtorController from '../controllers/ShowDebtorController';
import UpdateDebtorController from '../controllers/UpdateDebtorController';
import DeleteDebtorController from '../controllers/DeleteDebtorController';

const createDebtorController = new CreateDebtorController();
const listDebtorsController = new ListDebtorsController();
const showDebtorController = new ShowDebtorController();
const updateDebtorController = new UpdateDebtorController();
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

debtorRouter.get('/list', ensureAuthenticated, listDebtorsController.list);

debtorRouter.get(
  '/show/:debtor_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      debtor_id: Joi.string().required(),
    },
  }),
  showDebtorController.show
);

debtorRouter.put(
  '/update/:debtor_id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      cpf: Joi.string(),
    },
    [Segments.PARAMS]: {
      debtor_id: Joi.string().required(),
    },
  }),
  updateDebtorController.update
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
