import { Controller, Logger } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import * as newRelic from 'newrelic';
import { VerifyHasUpdateService } from '../services/verify-has-update.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class VerifyHasUpdateController {
  private readonly logger = new Logger(VerifyHasUpdateController.name);
  constructor(
    private readonly verifyHasUpdateService: VerifyHasUpdateService,
    @InjectQueue('get-set-details-queue') private getSetDetailsQueue: Queue,
  ) {}

  @MessagePattern('all-sets-codes')
  async verifyHasUpdate(@Payload() data: string[]) {
    newRelic.setTransactionName('Message/RabbitMQ/all-sets-codes');
    this.logger.log(`Received ${data.length} sets`);

    const setsCodesToInsert = await this.verifyHasUpdateService.execute(data);

    if (!setsCodesToInsert.length) {
      this.logger.log('No updates found');
      return;
    }

    this.logger.log(
      `${setsCodesToInsert.length} sets codes not registered has been found`,
    );

    this.logger.warn('Update process has been initiated');

    const getSetDetailsPromises = setsCodesToInsert.map(async (setCode) => {
      await this.getSetDetailsQueue.add('get-set-details-job', setCode, {
        removeOnComplete: true,
        removeOnFail: true,
      });
    });

    await Promise.all(getSetDetailsPromises);
    return;
  }
}
