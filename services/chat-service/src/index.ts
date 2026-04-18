import { createServer } from 'http';
import { createApp } from './app.js';
import { closeMongoClient, getMongoClient } from './clients/mongo.client.js';
import { connectRedis, closeRedis } from './clients/redis.client.js';
import { env } from './config/env.js';
import { startConsumers } from './messaging/rabbitmq.consumer.js';
import { logger } from './utils/logger.js';

const main = async () => {
  try {
    await Promise.all([getMongoClient(), connectRedis(), startConsumers()]);

    const app = createApp();
    const server = createServer(app);

    const port = env.CHAT_SERVICE_PORT;

    server.listen(port, () => {
      logger.info({ port }, 'Chat service is running');
    });

    const shutdown = () => {
      logger.info('Shutting down chat service...');
      Promise.all([closeRedis(), closeMongoClient()])
        .catch((error: unknown) => {
          logger.error({ error }, 'Error during shutdown tasks');
        })
        .finally(() => {
          server.close(() => process.exit(0));
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    logger.error({ error }, 'Failed to start chat service');
    process.exit(1);
  }
};

void main();
