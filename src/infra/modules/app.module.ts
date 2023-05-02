import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { CronModule } from './cron.module';
import { VerifyHasUpdateController } from '~/app/verify-has-update/verify-has-update.controller';
import { VerifyHasUpdateService } from '~/app/verify-has-update/verify-has-update.service';
import { QueueModule } from './queue.module';
import { MessagingModule } from './messaging.module';
import { CronService } from '~/app/cron/cron.service';
import { GetSetDetailsQueueConsumerService } from '~/app/queue/get-set-details/get-set-details-queue-consumer.service';
import { GetSetDetailsQueueProducerService } from '~/app/queue/get-set-details/get-set-details-queue-producer.service';
import { SendMessageService } from '~/app/send-message/send-message.service';

@Module({
  imports: [ConfigModule, CronModule, QueueModule, MessagingModule],
  controllers: [VerifyHasUpdateController],
  providers: [
    VerifyHasUpdateService,
    SendMessageService,
    CronService,
    GetSetDetailsQueueProducerService,
    GetSetDetailsQueueConsumerService,
  ],
})
export class AppModule {}
