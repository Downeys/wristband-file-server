import { getMockReq, getMockRes } from '@jest-mock/express';
import healthCheckController from './healthCheckController';

describe('Healthcheck endpoints', () => {
    it('should always return success message and 200 code', async () => {
        // Arrange
        const req = getMockReq();
        const { res } = getMockRes();
        const mockNext = jest.fn();

        // Act
        await healthCheckController.ping(req, res, mockNext);

        // Assert
        expect(res.statusMessage).toBe('pong');
        expect(res.sendStatus).toHaveBeenCalledWith(200);
    });
});
