import { Router } from 'express';

import { AuthenticateClientController } from '../controllers/authenticate-client';
import { AuthenticateDeliverymanController } from '../controllers/authenticate-deliveryman';

const authenticateRouter = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

authenticateRouter.post('/client', authenticateClientController.handle);
authenticateRouter.post(
  '/deliveryman',
  authenticateDeliverymanController.handle,
);

export { authenticateRouter };
