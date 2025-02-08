import { NextFunction, Response, Request } from 'express';

export interface MusicSubmissionController {
  createMusicSubmission: (req: Request, res: Response, next: NextFunction) => void;
}
