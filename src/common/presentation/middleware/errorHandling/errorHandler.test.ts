import { getMockReq, getMockRes } from '@jest-mock/express';
import globalErrorHandler from './errorHandler';
import ValidationError from '../../../application/errors/ValidationError';
import ArgumentError from '../../../domain/errors/ArgumentError';
import { INTERNAL_SERVER_ERROR } from '../../../infrastructure/constants/exceptionMessages';

describe('Error controller tests', () => {
  it('should return error status code and message for operational errors', async () => {
    // Arrange
    const req = getMockReq();
    const { res } = getMockRes();
    const mockNext = jest.fn();
    const e = new ValidationError('mock validation error');

    // Act
    await globalErrorHandler(e, req, res, mockNext);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('mock validation error');
  });
  it('should return 500 status code and internal server error message for non-operational errors', async () => {
    // Arrange
    const req = getMockReq();
    const { res } = getMockRes();
    const mockNext = jest.fn();
    const e = new ArgumentError('mock argument error');

    // Act
    await globalErrorHandler(e, req, res, mockNext);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });
});
