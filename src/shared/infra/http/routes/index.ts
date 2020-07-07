import { Router } from 'express';

import UserRoutes from '@modules/users/infra/http/routes/user.routes';

const routes = Router();

routes.use('/users', UserRoutes);

export default routes;
