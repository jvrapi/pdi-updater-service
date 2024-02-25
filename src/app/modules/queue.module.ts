import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: +process.env.REDIS_PORT,
      },
      prefix: 'services-updater',
    }),
    BullModule.registerQueue({
      name: 'create-set-queue',
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
