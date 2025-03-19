import * as Sentry from '@sentry/node';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getAllowedOrigins } from './config/cors';
import { guestUserMiddleware } from './middlewares/guest-user';
import { SessionAdapter } from './sessions/session.adapter';
import { getSessionMiddleware } from './sessions/session.middleware';
import { json } from 'express';
import { AllExceptionsFilter } from './filters/exception.filter';

const GLOBAl_API_PREFIX = 'api';
const logger = new Logger('Backend');

async function runServer() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0,
  });
  const port = process.env.APP_PORT || 1337;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  const sessionMiddleware = getSessionMiddleware();
  app.enableCors({
    origin: getAllowedOrigins(),
    credentials: true,
  });
  app.use(json({ limit: '50mb' }));
  app.use(sessionMiddleware);
  app.use(guestUserMiddleware);
  app.useWebSocketAdapter(new SessionAdapter(app, sessionMiddleware));
  app.setGlobalPrefix(GLOBAl_API_PREFIX);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`Application running at ${await app.getUrl()}`);
}

runServer();
