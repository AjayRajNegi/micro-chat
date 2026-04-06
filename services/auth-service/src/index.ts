import { createServer } from "http";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { closeDatabase, connectToDatabase } from "./db/sequelize.js";
import { initModels } from "./models/index.js";

const main = async () => {
  try {
    await connectToDatabase();
    await initModels();

    const app = createApp();
    const server = createServer(app);
    const port = env.AUTH_SERVICE_PORT;

    server.listen(port, () => {
      logger.info({ port }, "Auth service is running.");
    });

    // Graceful shutdown
    const shutdown = () => {
      logger.info("Shutting down auth service...");

      Promise.all([closeDatabase()])
        .catch((error: unknown) => {
          logger.error({ error }, "Error during shutdown tasks.");
        })
        .finally(() => {
          server.close(() => process.exit(0));
        });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error({ error }, "Failed to start auth service.");
    process.exit(1);
  }
};

void main();
