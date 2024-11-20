import { Request, Response, NextFunction } from 'express';
import logging from '../../../common/infrastructure/logging/logging';
import audioStreamingService from '../../application/services/audioStreamingService';
import { AudioStreamingController } from '../../application/interfaces/presentationInterfaces';

const NAMESPACE = 'audio-streaming-controller';

const getMp3AudioStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Fetching mp3 stream');
    const { fileName } = req.params;
    const range = req.headers.range ?? "0";

    try {
        const { stream, headers } = await audioStreamingService.streamMp3File(fileName, range);
        res.writeHead(206, headers);
        stream.pipe(res);
    } catch (e: any) {
        if (e.message === "Not allowed") {
            res.sendStatus(401).json({
                message: e.message
            });
        } else {
            res.sendStatus(500).json({
                message: e.message
            })
        }
    }
}

const getWebmAudioStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logging.info(NAMESPACE, 'Fetching webm stream');
    const { fileName } = req.params;
    const range = req.headers.range ?? "0";

    try {
        const { stream, headers } = await audioStreamingService.streamWebmFile(fileName, range);
        res.writeHead(206, headers);
        stream.pipe(res);
    } catch (e: any) {
        if (e.message === "Not allowed") {
            res.sendStatus(401).json({
                message: e.message
            });
        } else {
            res.sendStatus(500).json({
                message: e.message
            })
        }
    }
}

export const audioStreamingController: AudioStreamingController = { getMp3AudioStream, getWebmAudioStream };

export default { getMp3AudioStream };