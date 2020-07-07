import { Router } from 'express';

import UserRoutes from '@modules/users/infra/http/routes/user.routes';
import AuthenticateUserRoutes from '@modules/users/infra/http/routes/authenticate.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/users/authenticate', AuthenticateUserRoutes);

export default routes;
