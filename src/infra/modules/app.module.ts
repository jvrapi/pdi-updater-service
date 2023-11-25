import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { CronModule } from './cron.module';
import { MessagingModule } from './messaging.module';
import { CronService } from '~/app/cron/cron.service';
import { GetSetDetailsService } from '~/app/services/get-set-details.service';
import { VerifyHasUpdateController } from '~/app/controllers/verify-has-update.controller';
import { VerifyHasUpdateService } from '~/app/services/verify-has-update.service';
import { QueueModule } from './queue.module';
import { SendMessageService } from '~/app/services/send-message.service';

@Module({
  imports: [ConfigModule, CronModule, MessagingModule, QueueModule],
  controllers: [VerifyHasUpdateController],
  providers: [
    VerifyHasUpdateService,
    SendMessageService,
    CronService,
    GetSetDetailsService,
  ],
})
export class AppModule {}
