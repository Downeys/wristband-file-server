import express from 'express';
import { audioStreamingController } from '../controllers/audioStreamingController';

const router = express.Router();

router.get('/mp3/:songId/', audioStreamingController.getMp3AudioStream);
router.get('/webm/:songId/', audioStreamingController.getWebmAudioStream);

export default router;
