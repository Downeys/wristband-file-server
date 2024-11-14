import express, { Request, Response, NextFunction } from 'express';
import logging from './common/infrastructure/logging/logging';
import config from './common/presentation/config/config';
import submissionRoutes from './submissions/presentation/routes/musicSubmissionRoutes';
import streamingRoutes from './streaming/presentation/routes/audioStreamingRoutes';
import { INTERNAL_SERVER_ERROR } from './common/infrastructure/constants/exceptionMessages';

const NAMESPACE = "index"

const app = express();

// error handler
app.use((e: any, req: Request, res: Response, next: NextFunction) => {
    logging.error(NAMESPACE, e.stack)
    res.status(500).send(`${INTERNAL_SERVER_ERROR} ${e.message}`)
})

// logging
app.use((req, res, next) => {
    if (!req.url.match('/healthcheck')) {
        const loggingContext = { method: req.method, url: req.url, ip: req.socket.remoteAddress };
        logging.debug(NAMESPACE, 'received request', loggingContext);

        res.on('finish', () => {
            logging.info(NAMESPACE, 'produced response', { ...loggingContext, status: res.statusCode });
        });
    }

    next();
});

// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/submit', submissionRoutes);
app.use('/audio-stream', streamingRoutes);

app.listen(config.server.port, () => {
  console.log(`Server listening on port ${config.server.port}`);
});
