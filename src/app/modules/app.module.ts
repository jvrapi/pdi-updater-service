import { Module } from '@nestjs/common';
import { CronService } from '~/app/cron/cron.service';
import { GetAllSetsRegisteredService } from '../services/sets/get-all-sets-registered.service';
import { CreateNewSetAndCardsService } from '../services/sets/create-new-set-and-cards.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '~/infra/modules/database.module';
import { MessagingModule } from '~/infra/modules/messaging.module';
import { GetUncreatedSetCodesService } from '../services/sets/get-uncreated-set-codes.service';
import { validateEnv } from '~/config';
import { EnvModule } from './env.module';
import {
  CreateSetsController,
  VerifyHasUpdatesController,
} from '../controllers';
import {
  CreateSetDataService,
  ListSetsDataUnprocessedService,
  MarkSetDataAsProcessedService,
} from '../services/set-data';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    ScheduleModule.forRoot(),
    EnvModule,
    DatabaseModule,
    MessagingModule,
  ],
  providers: [
    GetUncreatedSetCodesService,
    CronService,
    GetAllSetsRegisteredService,
    CreateNewSetAndCardsService,
    CreateSetDataService,
    ListSetsDataUnprocessedService,
    MarkSetDataAsProcessedService,
  ],
  controllers: [CreateSetsController, VerifyHasUpdatesController],
})
export class AppModule {}
