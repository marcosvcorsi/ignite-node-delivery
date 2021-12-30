import "reflect-metadata";
import "./config/module-alias";

import express from "express";
import "express-async-errors";

import "./shared/container";

import { routes } from "./shared/infra/http/routes";
import { errorHandler } from "./shared/infra/http/middlewares/error";
import { logger } from "./shared/utils/logger";

const app = express();
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Server is running on port ${port}`));
