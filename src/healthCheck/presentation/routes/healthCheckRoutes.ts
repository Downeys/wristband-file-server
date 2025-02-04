import express from 'express';
import healthCheckController from '../controllers/healthCheckController';

const router = express.Router();

/**
 * @swagger
 * /healthcheck/ping:
 *   get:
 *     summary: Healthcheck endpoint.
 *     description: This endpoint can be used to check if the server is running.
 *     responses:
 *       200:
 *         description: Ok
 */
router.get('/ping', healthCheckController.ping);

export default router;
