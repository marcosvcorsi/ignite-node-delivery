import { Router } from "express";
import { ensureAuthenticatedClient } from "../../../../../shared/infra/http/middlewares/ensureAuthenticatedClient";
import { CreateDeliveryController } from "../controllers/create-delivery";
import { FindAvailableDeliveriesController } from "../controllers/find-available";

const deliveriesRouter = Router();

const createDeliveryController = new CreateDeliveryController();
const findAvailableDeliveriesController =
  new FindAvailableDeliveriesController();

deliveriesRouter.post(
  "/",
  ensureAuthenticatedClient,
  createDeliveryController.handle
);

deliveriesRouter.get("/", findAvailableDeliveriesController.handle);

export { deliveriesRouter };
