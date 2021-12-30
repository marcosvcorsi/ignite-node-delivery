import { ensureAuthenticatedDeliveryman } from "@/shared/infra/http/middlewares/ensureAuthenticatedDeliveryman";
import { Router } from "express";
import { CreateDeliverymanController } from "../controllers/create-deliveryman";
import { FindDeliverymanDeliveriesController } from "../controllers/find-deliveries";

const deliverymanRouter = Router();

const createDeliverymanController = new CreateDeliverymanController();
const findDeliverymanDeliveriesController =
  new FindDeliverymanDeliveriesController();

deliverymanRouter.post("/", createDeliverymanController.handle);

deliverymanRouter.get(
  "/deliveries",
  ensureAuthenticatedDeliveryman,
  findDeliverymanDeliveriesController.handle
);

export { deliverymanRouter };
