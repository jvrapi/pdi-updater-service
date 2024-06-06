import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EnvModule } from '~/app/modules/env.module';
import { EnvService } from '~/app/services/env';
import { QueueConfig } from '../queue/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [EnvService],
      imports: [EnvModule],
      useClass: QueueConfig,
    }),
    BullModule.registerQueue({ name: 'processSetData' }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
