import express from 'express';
import { audioStreamingController } from '../controllers/audioStreamingController';

const router = express.Router();

/**
 * @swagger
 * /audio-stream/mp3/{songId}:
 *   get:
 *     summary: Get mp3 audio stream
 *     description: Fetches chunked audio data
 *     parameters:
 *       - in : path
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the song to be fetched
 *     responses:
 *       206:
 *         description: Chunked song data
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: The song id is missing or invalid
 *       404:
 *         description: No song can be found with provided song id
 *       500:
 *         description: Internal server error
 */
router.get('/mp3/:songId/', audioStreamingController.getMp3AudioStream);

/**
 * @swagger
 * /audio-stream/webm/{songId}:
 *   get:
 *     summary: Get webm video stream
 *     desctiption: Fetches chunked video data
 *     parameters:
 *       - in : path
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the song to be fetched
 *     responses:
 *       206:
 *         description: Chunked song data
 *         content:
 *           video/webm:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: The song id is missing or invalid
 *       404:
 *         description: No song can be found with provided song id
 *       500:
 *         description: Internal server error
 */
router.get('/webm/:songId/', audioStreamingController.getWebmAudioStream);

export default router;
