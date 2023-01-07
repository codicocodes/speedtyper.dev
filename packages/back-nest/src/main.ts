import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { guestUserMiddleware } from './middlewares/guest-user';
import { SessionAdapter } from './sessions/session.adapter';
import { getSessionMiddleware } from './sessions/session.middleware';

const GLOBAl_API_PREFIX = 'api';

async function runServer() {
  const app = await NestFactory.create(AppModule);
  const sessionMiddleware = getSessionMiddleware();
  app.enableCors({
    // TODO: Fix for production
    origin: ['http://localhost:3001'],
    credentials: true,
  });
  app.use(sessionMiddleware);
  app.use(guestUserMiddleware);
  app.useWebSocketAdapter(new SessionAdapter(app, sessionMiddleware));
  app.setGlobalPrefix(GLOBAl_API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(1337);
}

runServer();
