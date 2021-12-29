import { Router } from "express";
import { ensureAuthenticatedClient } from "../../../../../shared/infra/http/middlewares/ensureAuthenticatedClient";
import { CreateDeliveryController } from "../controllers/create-delivery";

const deliveriesRouter = Router();

const createDeliveryController = new CreateDeliveryController();

deliveriesRouter.post(
  "/",
  ensureAuthenticatedClient,
  createDeliveryController.handle
);

export { deliveriesRouter };
