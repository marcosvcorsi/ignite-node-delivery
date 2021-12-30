import pino from 'pino';

import { loggerConfig } from '@/config/logger';

const logger = pino({
  level: loggerConfig.level,
});

export { logger };
