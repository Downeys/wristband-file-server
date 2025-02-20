import { NextFunction, Request, Response } from 'express';
import { HealthCheckController } from '../interfaces/healthCheckInterfaces';
import { logger } from '../../../common/application/config/logging';

const NAMESPACE = 'health-check-controller';

const ping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  logger.info('Health check endpoint engaged', { namespace: NAMESPACE });
  res.statusMessage = 'pong';
  res.sendStatus(200);
};

export const audioStreamingController: HealthCheckController = {
  ping,
};
export default audioStreamingController;
