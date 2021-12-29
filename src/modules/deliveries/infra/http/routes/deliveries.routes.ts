import { Router } from "express";
import { CreateDeliveryController } from "../controllers/create-delivery";

const deliveriesRouter = Router();

const createDeliveryController = new CreateDeliveryController();

deliveriesRouter.post("/", createDeliveryController.handle);

export { deliveriesRouter };
