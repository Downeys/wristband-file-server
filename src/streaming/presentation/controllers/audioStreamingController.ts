import { NextFunction, Request, Response } from 'express';
import audioStreamingService from '../../application/services/audioStreamingService';
import { AudioStreamingController } from '../../application/interfaces/presentationInterfaces';
import { ValidationError } from '../../../common/application/errors/ValidationError';
import { asyncErrorHandler } from '../../../common/presentation/errors/asyncErrorHandler';
import { logger } from '../../../common/application/config/logging';

const NAMESPACE = 'audio-streaming-controller';

const getMp3AudioStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  logger.info('Fetching mp3 stream', { namespace: NAMESPACE });
  const { songId } = req.params;
  const range = req.headers.range;
  if (!songId) throw new ValidationError('Missing file id. File id must be provided as a request parameter.');

  const { stream, headers } = await audioStreamingService.streamMp3File(songId, range);
  res.writeHead(206, headers);
  stream.pipe(res);
};

const getWebmAudioStream = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  logger.info('Fetching webm stream', { namespace: NAMESPACE });
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
