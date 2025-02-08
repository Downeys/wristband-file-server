import express from 'express';
import multer from 'multer';
import musicSubmissionController from '../controllers/musicSubmissionController';

const router = express.Router();
const upload = multer();

/**
 * @swagger
 * /submit:
 *   post:
 *     summary: Uploads music submission
 *     description: Stores uploaded image and song files and form data from music submission
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/MusicSubmissionInput'
 *     responses:
 *       201:
 *         description: Submission id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/MusicSubmissionResponse'
 *       400:
 *         description: Submission is missing or invalid
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/',
  upload.fields([
    { name: 'imageFiles', maxCount: 20 },
    { name: 'audioFiles', maxCount: 20 },
  ]),
  musicSubmissionController.createMusicSubmission
);

export default router;
