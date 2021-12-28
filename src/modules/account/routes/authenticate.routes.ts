import { Router } from "express";
import { AuthenticateClientController } from "../controllers/authenticate-client";

const authenticateRouter = Router();

const authenticateClientController = new AuthenticateClientController();

authenticateRouter.post("/", authenticateClientController.handle);

export { authenticateRouter };
