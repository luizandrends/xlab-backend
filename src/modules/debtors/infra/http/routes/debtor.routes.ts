import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateDebtorController from '../controllers/CreateDebtorController';
import ListDebtorsController from '../controllers/ListDebtorsController';
import ShowDebtorController from '../controllers/ShowDebtorController';
import UpdateDebtorController from '../controllers/UpdateDebtorController';
import DeleteDebtorController from '../controllers/DeleteDebtorController';
import FindDebtorByNameController from '../controllers/FindDebtorByNameController';

const createDebtorController = new CreateDebtorController();
const listDebtorsController = new ListDebtorsController();
const showDebtorController = new ShowDebtorController();
const updateDebtorController = new UpdateDebtorController();
const deleteDebtorController = new DeleteDebtorController();
const findDebtorByNameController = new FindDebtorByNameController();

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

debtorRouter.get(
  '/find/:debtor_name',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      debtor_name: Joi.string().required(),
    },
  }),
  findDebtorByNameController.find
);

debtorRouter.put(
  '/update/:debtor_id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      cpf: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      debtor_id: Joi.string(),
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
