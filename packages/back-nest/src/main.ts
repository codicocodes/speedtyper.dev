import * as Sentry from '@sentry/node';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getAllowedOrigins } from './config/cors';
import { guestUserMiddleware } from './middlewares/guest-user';
import { SessionAdapter } from './sessions/session.adapter';
import { getSessionMiddleware } from './sessions/session.middleware';

const GLOBAl_API_PREFIX = 'api';

async function runServer() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0,
  });
  const port = process.env.PORT || 1337;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  const sessionMiddleware = getSessionMiddleware();
  app.enableCors({
    origin: getAllowedOrigins(),
    credentials: true,
  });
  app.use(sessionMiddleware);
  app.use(guestUserMiddleware);
  app.useWebSocketAdapter(new SessionAdapter(app, sessionMiddleware));
  app.setGlobalPrefix(GLOBAl_API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}

runServer();
