import { NextFunction, Request, Response } from 'express';
import logging from '../../../common/infrastructure/logging/logging';
import { HealthCheckController } from '../interfaces/healthCheckInterfaces';
import asyncErrorHandler from '../../../common/presentation/errors/asyncErrorHandler';

const NAMESPACE = 'health-check-controller';

const ping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Health check endpoint engaged');
    res.statusMessage = 'pong';
    res.sendStatus(200);
};

export const audioStreamingController: HealthCheckController = {
    ping: asyncErrorHandler(ping),
};
export default audioStreamingController;
