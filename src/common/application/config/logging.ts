import winston from 'winston';
import LokiTransport from 'winston-loki';

const { combine, timestamp, json, errors } = winston.format;

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    service: 'file-server',
  },
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new LokiTransport({
      host: 'http://127.0.0.1:3100',
      json: true,
      labels: { service: 'node-backend' },
      onConnectionError: (err) => console.error('Loki connection error.', err),
    }),
  ],
});
