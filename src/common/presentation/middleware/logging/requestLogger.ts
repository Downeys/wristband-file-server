import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../application/config/logging';

const NAMESPACE = 'middleware-request-logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/metrics' || req.path === '/healthcheck') return next();

  const loggingContext = {
    namespace: NAMESPACE,
    method: req.method,
    url: req.url,
    ip: req.socket.remoteAddress,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString(),
  };
  logger.info('received request', loggingContext);

  res.on('finish', () => {
    logger.info(NAMESPACE, 'produced response', {
      ...loggingContext,
      status: res.statusCode,
    });
  });
  next();
};
