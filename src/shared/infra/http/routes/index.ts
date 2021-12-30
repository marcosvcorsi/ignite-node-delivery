import { Router } from 'express';

import { authenticateRouter } from '../../../../modules/account/infra/http/routes/authenticate.routes';
import { clientsRouter } from '../../../../modules/clients/infra/http/routes/clients.routes';
import { deliveriesRouter } from '../../../../modules/deliveries/infra/http/routes/deliveries.routes';
import { deliverymanRouter } from '../../../../modules/deliveryman/infra/http/routes/deliveryman.routes';

const routes = Router();

routes.use('/authenticate', authenticateRouter);
routes.use('/clients', clientsRouter);
routes.use('/deliveryman', deliverymanRouter);
routes.use('/deliveries', deliveriesRouter);

export { routes };
