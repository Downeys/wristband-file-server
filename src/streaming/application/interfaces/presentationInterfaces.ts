import { NextFunction, Response, Request } from 'express';

export interface AudioStreamingController {
    getMp3AudioStream: (req: Request, res: Response, next: NextFunction) => void;
    getWebmAudioStream: (req: Request, res: Response, next: NextFunction) => void;
}
