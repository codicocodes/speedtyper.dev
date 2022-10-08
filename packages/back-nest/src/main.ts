import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function runServer() {
  const app = await NestFactory.create(AppModule);
  await app.listen(1337);
}

runServer();
