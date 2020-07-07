import { Router } from 'express';

import UserRoutes from '@modules/users/infra/http/routes/user.routes';
import AuthenticateUserRoutes from '@modules/users/infra/http/routes/authenticate.routes';

import DebtorRoutes from '@modules/debtors/infra/http/routes/debtor.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/users/authenticate', AuthenticateUserRoutes);

routes.use('/debtors', DebtorRoutes);

export default routes;
