import { NextFunction, Request, Response } from 'express';
import BaseError from '../../domain/error/BaseError';
import { INTERNAL_SERVER_ERROR } from '../../infrastructure/constants/exceptionMessages';
import ValidationError from '../errors/ValidationError';

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    // log error
    if (err instanceof ValidationError) {
        res.sendStatus(err.statusCode).json({
            status: err.status,
            message: err.message,
            data: err.errorData,
        });
    } else if (err instanceof BaseError && err.isOperational) {
        res.sendStatus(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.sendStatus(500).json({
            status: 'error',
            message: INTERNAL_SERVER_ERROR,
        });
    }
};
export default globalErrorHandler;
