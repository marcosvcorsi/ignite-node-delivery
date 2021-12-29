import "reflect-metadata";
import "./config/module-alias";

import express from "express";
import "express-async-errors";

import { routes } from "./shared/infra/http/routes";
import { errorHandler } from "./shared/infra/http/middlewares/error";

const app = express();
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
