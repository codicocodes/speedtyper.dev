import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { guestUserMiddleware } from './middlewares/guest-user';
import { sessionMiddleware } from './middlewares/sessions/session.middleware';

const GLOBAl_API_PREFIX = 'api';


async function runServer() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAl_API_PREFIX);
  app.use(sessionMiddleware());
  app.use(guestUserMiddleware);
  await app.listen(1337);
}

runServer();
