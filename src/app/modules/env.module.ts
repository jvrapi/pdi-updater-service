import { Module } from '@nestjs/common';
import { EnvService } from '../services/env';

@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
