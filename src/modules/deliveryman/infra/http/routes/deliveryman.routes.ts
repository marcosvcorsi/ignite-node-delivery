import { Router } from "express";
import { CreateDeliverymanController } from "../controllers/create-deliveryman";

const deliverymanRouter = Router();

const createDeliverymanController = new CreateDeliverymanController();

deliverymanRouter.post("/", createDeliverymanController.handle);

export { deliverymanRouter };
