import { Router } from "express";
import { authenticateRouter } from "../../../../modules/account/infra/http/routes/authenticate.routes";
import { clientsRouter } from "../../../../modules/clients/infra/http/routes/clients.routes";

const routes = Router();

routes.use("/authenticate", authenticateRouter);
routes.use("/clients", clientsRouter);

export { routes };