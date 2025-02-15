import client from 'prom-client';
import { Request, Response, NextFunction } from 'express';

const register = new client.Registry();

// default metrics collection
client.collectDefaultMetrics({ register });

// custom metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});

register.registerMetric(httpRequestDurationMicroseconds);

const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path, code: res.statusCode });
  });
  next();
};

// metrics endpoint for prometheus scraper
const metricsEndpoint = async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

export { metricsMiddleware, metricsEndpoint };
