import { ensureAuthenticatedClient } from "@/shared/infra/http/middlewares/ensureAuthenticatedClient";
import { Router } from "express";
import { CreateClientController } from "../controllers/create-client";
import { FindClientDeliveriesController } from "../controllers/find-client-deliveries";

const clientsRouter = Router();

const createClientController = new CreateClientController();
const findClientDeliveriesController = new FindClientDeliveriesController();

clientsRouter.post("/", createClientController.handle);

clientsRouter.get(
  "/deliveries",
  ensureAuthenticatedClient,
  findClientDeliveriesController.handle
);

export { clientsRouter };
