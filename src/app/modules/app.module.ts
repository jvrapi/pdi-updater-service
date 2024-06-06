import { Module } from '@nestjs/common';
import { CronService } from '~/app/cron/cron.service';

import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { validateEnv } from '~/config';
import { EnvModule } from './env.module';
import {
  CreateSetsController,
  ProcessSetDataController,
  VerifyHasUpdatesController,
} from '../controllers';
import {
  CreateSetDataService,
  ListSetsDataUnprocessedService,
} from '../services/set-data';
import {
  DatabaseModule,
  MessagingModule,
  ScryfallModule,
} from '~/infra/modules';
import {
  GetUncreatedSetCodesService,
  GetAllSetsRegisteredService,
  CreateNewSetAndCardsService,
} from '../services/sets';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    ScheduleModule.forRoot(),
    EnvModule,
    DatabaseModule,
    ScryfallModule,
    MessagingModule,
  ],
  providers: [
    GetUncreatedSetCodesService,
    CronService,
    GetAllSetsRegisteredService,
    CreateNewSetAndCardsService,
    CreateSetDataService,
    ListSetsDataUnprocessedService,
  ],
  controllers: [
    CreateSetsController,
    VerifyHasUpdatesController,
    ProcessSetDataController,
  ],
})
export class AppModule {}
