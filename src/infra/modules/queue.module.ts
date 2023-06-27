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
      prefix: 'updater_service',
    }),
    BullModule.registerQueue({
      name: 'get-set-details-queue',
    }),
  ],
  exports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: +process.env.REDIS_PORT,
        tls: {},
      },
      prefix: 'updater_service',
    }),
    BullModule.registerQueue({
      name: 'get-set-details-queue',
    }),
  ],
})
export class QueueModule {}
