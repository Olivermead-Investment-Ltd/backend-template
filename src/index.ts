import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import compression from 'compression';
// import { Server } from 'socket.io';
import * as Sentry from '@sentry/node';
import express, { Request } from 'express';
import * as Tracing from '@sentry/tracing';

import routes from './routes';
import db from './database/models';
import { errorHandler } from './modules/common/utils';

config();

const app = express();
const { sequelize } = db;
// const io = new Server();
const { PORT, SENTRY_DSN, NODE_ENV } = process.env;

// Middlewares
app.use(helmet());
app.use(compression());

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    environment: NODE_ENV,
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use((req: Request, _res, next) => {
    // @ts-ignore
    if (!req.transaction) {
      // @ts-ignore
      req.transaction = Sentry.startTransaction({
        op: 'test',
        name: 'My First Test Transaction',
      });
    }
    next();
  });
}

app.use(
  cors({
    origin: (_origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.disable('x-powered-by');

app.use('/', routes);

// Error handlers
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

export default app;

// Start the server
sequelize
  .authenticate()
  .then(() => {
    console.log(`Environment is ${NODE_ENV}`);
    console.log(`Connected to database: ${process.env.DB_NAME}`);
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((e) => console.log('Failed to connect to database:', e.message));
