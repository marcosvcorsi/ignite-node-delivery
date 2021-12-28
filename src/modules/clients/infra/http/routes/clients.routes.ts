import { Router } from "express";
import { CreateClientController } from "../controllers/create-client";

const clientsRouter = Router();

const createClientController = new CreateClientController();

clientsRouter.post("/", createClientController.handle);

export { clientsRouter };
