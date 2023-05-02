import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class GetSetDetailsQueueProducerService {
  constructor(
    @InjectQueue('get-set-details-queue') private getSetDetailsQueue: Queue,
  ) {}

  async getSetDetails(setCode: string) {
    await this.getSetDetailsQueue.add('get-set-details-job', setCode);
  }
}
