import { ensureAuthenticatedDeliveryman } from "@/shared/infra/http/middlewares/ensureAuthenticatedDeliveryman";
import { Router } from "express";
import { ensureAuthenticatedClient } from "../../../../../shared/infra/http/middlewares/ensureAuthenticatedClient";
import { CreateDeliveryController } from "../controllers/create-delivery";
import { FindAvailableDeliveriesController } from "../controllers/find-available";
import { FinishDeliveryController } from "../controllers/finish-delivery";
import { PickUpDeliveryController } from "../controllers/pickup-delivery";

const deliveriesRouter = Router();

const createDeliveryController = new CreateDeliveryController();
const findAvailableDeliveriesController =
  new FindAvailableDeliveriesController();
const pickUpDeliveryController = new PickUpDeliveryController();
const finishDeliveryController = new FinishDeliveryController();

deliveriesRouter.post(
  "/",
  ensureAuthenticatedClient,
  createDeliveryController.handle
);

deliveriesRouter.get(
  "/available",
  ensureAuthenticatedDeliveryman,
  findAvailableDeliveriesController.handle
);

deliveriesRouter.patch(
  "/:id/pick-up",
  ensureAuthenticatedDeliveryman,
  pickUpDeliveryController.handle
);

deliveriesRouter.patch(
  "/:id/finish",
  ensureAuthenticatedDeliveryman,
  finishDeliveryController.handle
);

export { deliveriesRouter };
