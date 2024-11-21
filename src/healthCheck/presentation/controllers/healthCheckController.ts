import { Request, Response, NextFunction } from 'express';
import logging from '../../../common/infrastructure/logging/logging';
import { HealthCheckController } from '../interfaces/healthCheckInterfaces';

const NAMESPACE = 'health-check-controller';

const ping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Health check endpoint engaged');
    res.send(200).json({
        result: 'pong'
    })
}

export const audioStreamingController: HealthCheckController = { ping };

export default { ping };