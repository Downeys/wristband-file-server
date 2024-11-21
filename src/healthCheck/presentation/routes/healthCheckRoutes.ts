import express from 'express';
import healthCheckController from '../controllers/healthCheckController';

const router = express.Router();

router.get('/ping', healthCheckController.ping);

export default router;

