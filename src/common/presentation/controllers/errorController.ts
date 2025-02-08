import { NextFunction, Request, Response } from 'express';
import BaseError from '../../domain/errors/BaseError';
import { INTERNAL_SERVER_ERROR } from '../../infrastructure/constants/exceptionMessages';
import { logger } from '../../application/config/logging';

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    if (err instanceof BaseError && err.isOperational) {
        res.status(err.statusCode).send(err.message);
    } else {
        res.status(500).send(INTERNAL_SERVER_ERROR);
    }
};
export default globalErrorHandler;
