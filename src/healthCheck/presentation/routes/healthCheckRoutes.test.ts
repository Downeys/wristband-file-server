import express, { Application } from 'express';
import healthCheckRoutes from '../routes/healthCheckRoutes';
import request from 'supertest';

describe('Healthcheck routes', () => {
    let app: Application;

    beforeEach(() => {
        app = express();
        app.use('/', healthCheckRoutes);
    });

    it('should call healcheck endpoint', async () => {
        // Arrange
        // Act
        const response = await request(app).get('/ping');

        // Assert
        expect(response.status).toBe(200);
    });
});
