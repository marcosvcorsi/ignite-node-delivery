import { Router } from "express";
import { authenticateRouter } from "../../../modules/account/routes/authenticate.routes";
import { clientsRouter } from "../../../modules/clients/routes/clients.routes";

const routes = Router();

routes.use("/authenticate", authenticateRouter);
routes.use("/clients", clientsRouter);

export { routes };
