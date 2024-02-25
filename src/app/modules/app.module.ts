import { Module } from '@nestjs/common';
import { CronService } from '~/app/cron/cron.service';
import { QueueModule } from './queue.module';
import { GetAllSetsRegisteredService } from '../services/sets/get-all-sets-registered.service';
import { CreateNewSetAndCardsService } from '../services/sets/create-new-set-and-cards.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '~/infra/modules/database.module';
import { MessagingModule } from '~/infra/modules/messaging.module';
import { MessagingController } from '../controllers/messaging.controller';
import { VerifyHasUpdatesService } from '../services/sets/verify-has-updates.service';
import { GetUncreatedSetCodesService } from '../services/sets/get-uncreated-set-codes.service';
import { CreateSetJob } from '../jobs/create-set.job';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    QueueModule,
    DatabaseModule,
    MessagingModule,
  ],
  providers: [
    VerifyHasUpdatesService,
    GetUncreatedSetCodesService,
    CronService,
    GetAllSetsRegisteredService,
    CreateNewSetAndCardsService,
    CreateSetJob,
  ],
  controllers: [MessagingController],
})
export class AppModule {}
