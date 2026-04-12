//Create a logger instance which is used by every package
import pino from 'pino';
import type { Logger, LoggerOptions } from 'pino';
import path from 'path';

type CreateLoggerOptions = LoggerOptions & {
  name: string;
};

export const createLogger = (options: CreateLoggerOptions): Logger => {
  const { name, ...rest } = options;

  const transport = pino.transport({
    targets: [
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              target: 'pino-pretty',
              options: { colorize: true, translateTime: 'SYS:standard' },
              level: process.env.LOG_LEVEL || 'info',
            },
          ]
        : []),
      {
        target: path.join(path.dirname(require.resolve('pino')), 'file.js'),
        options: {
          destination: path.join(process.cwd(), 'logs', 'app.log'),
          mkdir: true,
        },
        level: process.env.LOG_LEVEL || 'info',
      },
    ],
  });

  return pino(
    {
      name,
      level: process.env.LOG_LEVEL || 'info',
      ...rest,
    },
    transport,
  );
};
