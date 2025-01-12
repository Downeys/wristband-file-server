import express from 'express';
import multer from 'multer';
import musicSubmissionController from '../controllers/musicSubmissionController';

const router = express.Router();
const upload = multer();

router.post(
    '/',
    upload.fields([
        { name: 'imageFiles', maxCount: 20 },
        { name: 'audioFiles', maxCount: 20 },
    ]),
    musicSubmissionController.createMusicSubmission
);

export default router;
