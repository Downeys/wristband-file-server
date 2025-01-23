import { NextFunction, Request, Response } from 'express';
import logging from '../../../common/infrastructure/logging/logging';
import { MusicSubmissionInput } from '../../application/interfaces/modelInterfaces';
import musicSubmissionService from '../../application/services/musicSubmissionService';
import { MusicSubmissionController } from '../../application/interfaces/presentationInterfaces';
import ValidationError from '../../../common/application/errors/ValidationError';
import { asyncErrorHandler } from '../../../common/presentation/errors/asyncErrorHandler';

const NAMESPACE = 'music-submission-controller';

const createMusicSubmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Music submission received');
    if (!req.files) {
        logging.error(NAMESPACE, 'Failed to submit music. Files missing from request.');
        throw new ValidationError('Missing files. Image and song files must be included with the request.');
    }
    // This next line is necessary to enable the property indexing of file groups from the files object
    const files = Object.fromEntries(Object.entries(req.files));
    const imageFiles = files.imageFiles;
    const audioFiles = files.audioFiles;
    const musicSubmission: MusicSubmissionInput = { ...req.body };
    const submission = await musicSubmissionService.handleMusicSubmissionUpload(musicSubmission, imageFiles, audioFiles);
    res.send(200).json({
        result: submission.submissionId,
    });
};

export const musicSubmissionController: MusicSubmissionController = {
    createMusicSubmission: asyncErrorHandler(createMusicSubmission),
};
export default musicSubmissionController;
