import { Router } from "express";
import { authenticateRouter } from "../../../../modules/account/infra/http/routes/authenticate.routes";
import { clientsRouter } from "../../../../modules/clients/infra/http/routes/clients.routes";
import { deliverymanRouter } from "../../../../modules/deliveryman/infra/http/routes/deliveryman.routes";

const routes = Router();

routes.use("/authenticate", authenticateRouter);
routes.use("/clients", clientsRouter);
routes.use("/deliveryman", deliverymanRouter);

export { routes };
