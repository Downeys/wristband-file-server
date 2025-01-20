import { NextFunction, Request, Response } from 'express';
import logging from '../../../common/infrastructure/logging/logging';
import audioStreamingService from '../../application/services/audioStreamingService';
import { AudioStreamingController } from '../../application/interfaces/presentationInterfaces';
import asyncErrorHandler from '../../../common/presentation/errors/asyncErrorHandler';

const NAMESPACE = 'audio-streaming-controller';

const getMp3AudioStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Fetching mp3 stream');
    const { fileName } = req.params;
    const range = req.headers.range;

    const { stream, headers } = await audioStreamingService.streamMp3File(fileName, range);
    res.writeHead(206, headers);
    stream.pipe(res);
};

const getWebmAudioStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Fetching webm stream');
    const { fileName } = req.params;
    const range = req.headers.range;

    const { stream, headers } = await audioStreamingService.streamWebmFile(fileName, range);
    res.writeHead(206, headers);
    stream.pipe(res);
};

export const audioStreamingController: AudioStreamingController = {
    getMp3AudioStream: asyncErrorHandler(getMp3AudioStream),
    getWebmAudioStream: asyncErrorHandler(getWebmAudioStream),
};

export default audioStreamingController;
