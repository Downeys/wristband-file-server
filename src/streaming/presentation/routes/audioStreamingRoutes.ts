import express from 'express';
import { audioStreamingController } from '../controllers/audioStreamingController';

const router = express.Router();

router.get('/mp3/:fileId/', audioStreamingController.getMp3AudioStream);
router.get('/webm/:fileId/', audioStreamingController.getWebmAudioStream);

export default router;
