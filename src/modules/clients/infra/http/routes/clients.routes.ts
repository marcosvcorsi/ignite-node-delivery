import { Router } from 'express';

import { ensureAuthenticatedClient } from '@/shared/infra/http/middlewares/ensureAuthenticatedClient';

import { CreateClientController } from '../controllers/create-client';
import { FindClientDeliveriesController } from '../controllers/find-deliveries';

const clientsRouter = Router();

const createClientController = new CreateClientController();
const findClientDeliveriesController = new FindClientDeliveriesController();

clientsRouter.post('/', createClientController.handle);

clientsRouter.get(
  '/deliveries',
  ensureAuthenticatedClient,
  findClientDeliveriesController.handle,
);

export { clientsRouter };
