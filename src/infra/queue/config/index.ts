import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { EnvService } from '~/app/services/env';

@Injectable()
export class QueueConfig implements SharedBullConfigurationFactory {
  constructor(private readonly envService: EnvService) {}
  createSharedConfiguration(): BullRootModuleOptions {
    return {
      redis: {
        host: this.envService.get('REDIS_HOST'),
        port: Number(this.envService.get('REDIS_PORT')),
        password: this.envService.get('REDIS_PASSWORD'),
      },
    };
  }
}
