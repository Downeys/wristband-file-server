import { Request, Response, NextFunction } from 'express';
import logging from '../../../common/infrastructure/logging/logging';
import { HealthCheckController } from '../interfaces/healthCheckInterfaces';

const NAMESPACE = 'health-check-controller';

const ping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Health check endpoint engaged');
    res.statusMessage = 'pong';
    res.sendStatus(200)
}

export const audioStreamingController: HealthCheckController = { ping };

export default { ping };