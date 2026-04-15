import { createServer } from 'http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { initializeDatabase } from './db/sequelize.js';
import { startAuthEventConsumer } from './messaging/auth-consumer.js';

const main = async () => {
  try {
    await initializeDatabase();
    await startAuthEventConsumer();

    const app = createApp();
    const server = createServer(app);
    const port = env.USER_SERVICE_PORT;

    server.listen(port, () => {
      logger.info({ port }, 'User service is running.');
    });

    // Graceful shutdown
    const shutdown = () => {
      logger.info('Shutting down user service...');

      Promise.all([])
        .catch((error: unknown) => {
          logger.error({ error }, 'Error during shutdown tasks.');
        })
        .finally(() => {
          server.close(() => process.exit(0));
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    logger.error({ error }, 'Failed to start user service.');
    process.exit(1);
  }
};

void main();
