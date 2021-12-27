import { Router } from "express";
import { clientsRouter } from "../../../modules/clients/routes/clients.routes";

const routes = Router();

routes.use("/clients", clientsRouter);

export { routes };
