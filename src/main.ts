import 'dotenv/config';
import 'newrelic';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
}
bootstrap();
