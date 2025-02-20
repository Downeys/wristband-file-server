import { Request, Response, NextFunction } from 'express';

export interface HealthCheckController {
  ping: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
