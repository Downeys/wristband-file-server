import express from 'express';
import { audioStreamingController } from '../controllers/audioStreamingController';

const router = express.Router();

router.get('/mp3/:fileName/', audioStreamingController.getMp3AudioStream);
router.get('/webm/:fileName/', audioStreamingController.getWebmAudioStream);

export default router;
