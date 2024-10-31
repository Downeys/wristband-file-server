import express, { Request, Response, NextFunction } from 'express';
import logging from './common/infrastructure/logging/logging';
import config from './common/presentation/config/config';

const NAMESPACE = "index"

const app = express();

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logging.error(NAMESPACE, err.stack)
    res.status(500).send('Server errer: ' + err.message)
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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Node.js server!');
});

app.listen(config.server.port, () => {
  console.log(`Server listening on port ${config.server.port}`);
});
