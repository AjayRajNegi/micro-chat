import { Sequelize } from 'sequelize';
import { env } from '@/config/env.js';
import { logger } from '@/utils/logger.js';

export const sequelize = new Sequelize(env.USER_DB_URL, {
  dialect: 'postgres',
  logging:
    env.NODE_ENV === 'development'
      ? (msg: unknown) => {
          logger.debug({ sequelize: msg });
        }
      : false,
  define: {
    underscored: true,
    freezeTableName: true,
  },
});

export const connectToDatabase = async () => {
  await sequelize.authenticate();
  logger.info('User database connection established successfully.');
};

export const closeDatabase = async () => {
  await sequelize.close();
  logger.info('User database connection closed.');
};

export const initializeDatabase = async () => {
  await connectToDatabase();
};
