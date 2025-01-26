import { NextFunction, Request, Response } from 'express';
import logging from '../../../common/infrastructure/logging/logging';
import audioStreamingService from '../../application/services/audioStreamingService';
import { AudioStreamingController } from '../../application/interfaces/presentationInterfaces';
import { ValidationError } from '../../../common/application/errors/ValidationError';
import { asyncErrorHandler } from '../../../common/presentation/errors/asyncErrorHandler';

const NAMESPACE = 'audio-streaming-controller';

const getMp3AudioStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Fetching mp3 stream');
    const { songId } = req.params;
    const range = req.headers.range;
    if (!songId) throw new ValidationError('Missing file id. File id must be provided as a request parameter.');

    const { stream, headers } = await audioStreamingService.streamMp3File(songId, range);
    res.writeHead(206, headers);
    stream.pipe(res);
};

const getWebmAudioStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Fetching webm stream');
    const { songId } = req.params;
    const range = req.headers.range;
    if (!songId) throw new ValidationError('Missing file id. File id must be provided as a request parameter.');

    const { stream, headers } = await audioStreamingService.streamWebmFile(songId, range);
    res.writeHead(206, headers);
    stream.pipe(res);
};

export const audioStreamingController: AudioStreamingController = {
    getMp3AudioStream: asyncErrorHandler(getMp3AudioStream),
    getWebmAudioStream: asyncErrorHandler(getWebmAudioStream),
};

export default audioStreamingController;
