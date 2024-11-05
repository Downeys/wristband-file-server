import { Request, Response, NextFunction } from 'express';
import logging from '../../../common/infrastructure/logging/logging';
import { MusicSubmission } from '../../application/interfaces/modelInterfaces';
import musicSubmissionService from '../../application/services/musicSubmissionService';
import { MusicSubmissionController } from '../../application/interfaces/presentationInterfaces';

const NAMESPACE = 'music-submission-controller';

const createMusicSubmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Music submission received');
    if (!req.files) {
        logging.error(NAMESPACE, 'Failed to submit music. Files missing from request.');
        throw Error('Internal server error');
    }
    // Is this a hack or is this genius? 2 things can be true.
    const files = Object.fromEntries(Object.entries(req.files));
    const imageFiles = files.imageFiles;
    const audioFiles = files.audioFiles;
    const musicSubmission: MusicSubmission = { ...req.body };
    try {
        const submission = await musicSubmissionService.handleMusicSubmissionUpload(musicSubmission, imageFiles, audioFiles);
        res.send(200).json({
            result: submission.submissionId
        });
    } catch (e: any) {
        if (e.message === "Not allowed") {
            res.send(401).json({
                message: e.message
            });
        } else {
            res.send(500).json({
                message: e.message
            })
        }
    }

}

export const musicSubmissionController: MusicSubmissionController = { createMusicSubmission };

export default { createMusicSubmission };