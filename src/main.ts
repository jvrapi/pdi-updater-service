import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NewRelicInterceptor } from './app/interceptors/new-relic-interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_UPDATER_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalInterceptors(new NewRelicInterceptor());

  await app.listen();
}
bootstrap();
