import express from 'express';
import config from './common/presentation/config/config';
import healthCheckRoutes from './healthCheck/presentation/routes/healthCheckRoutes';
import submissionRoutes from './submissions/presentation/routes/musicSubmissionRoutes';
import streamingRoutes from './streaming/presentation/routes/audioStreamingRoutes';
import NotFoundError from './common/application/errors/NotFoundError';
import globalErrorHandler from './common/presentation/middleware/errorHandling/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './common/presentation/config/swagger';
import { logger } from './common/application/config/logging';
import { metricsEndpoint, metricsMiddleware } from './common/presentation/middleware/monitoring/prometheus';
import { requestLogger } from './common/presentation/middleware/logging/requestLogger';
import { expressMiddleware } from 'zipkin-instrumentation-express';
import { zipkinTracer } from './common/presentation/middleware/monitoring/traces';

const app = express();

// logging
app.use(requestLogger);

// tracing
app.use(expressMiddleware({ tracer: zipkinTracer }));

// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// custom metric middleware
app.use(metricsMiddleware);

// routes
app.use('/healthcheck', healthCheckRoutes);
app.use('/submit', submissionRoutes);
app.use('/audio-stream', streamingRoutes);

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// for prometheus scraping
app.use('/metrics', metricsEndpoint);

app.all('*', (req, res, next) => {
  const error = new NotFoundError(`${req.originalUrl} is not a valid url. It does not exist.`);
  next(error);
});

// error handler middleware
app.use(globalErrorHandler);

app.listen(config.server.port, () => {
  logger.info(`Server listening on port ${config.server.port}`);
});
