import express from 'express';
import config from './common/presentation/config/config';
import healthCheckRoutes from './healthCheck/presentation/routes/healthCheckRoutes';
import submissionRoutes from './submissions/presentation/routes/musicSubmissionRoutes';
import streamingRoutes from './streaming/presentation/routes/audioStreamingRoutes';
import NotFoundError from './common/application/errors/NotFoundError';
import globalErrorHandler from './common/presentation/controllers/errorController';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './common/presentation/config/swagger';
import { logger } from './common/application/config/logging';

const NAMESPACE = 'index';

const app = express();

// logging
app.use((req, res, next) => {
    if (!req.url.match('/healthcheck')) {
        const loggingContext = {
            namespace: NAMESPACE,
            method: req.method,
            url: req.url,
            ip: req.socket.remoteAddress,
        };
        logger.debug('received request', loggingContext);

        res.on('finish', () => {
            logger.info(NAMESPACE, 'produced response', {
                ...loggingContext,
                status: res.statusCode,
            });
        });
    }

    next();
});

// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/healthcheck', healthCheckRoutes);
app.use('/submit', submissionRoutes);
app.use('/audio-stream', streamingRoutes);

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all('*', (req, res, next) => {
    const error = new NotFoundError(`${req.originalUrl} is not a valid url. It does not exist.`);
    next(error);
});

// error handler middleware
app.use(globalErrorHandler);

app.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port}`);
});
