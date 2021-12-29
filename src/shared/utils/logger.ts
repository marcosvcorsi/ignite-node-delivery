import { loggerConfig } from "@/config/logger";
import pino from "pino";

const logger = pino({
  level: loggerConfig.level,
});

export { logger };
