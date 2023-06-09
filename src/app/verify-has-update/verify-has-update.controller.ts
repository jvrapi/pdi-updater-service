import { Controller, Logger } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { VerifyHasUpdateService } from './verify-has-update.service';
import { GetSetDetailsQueueProducerService } from '../queue/get-set-details/get-set-details-queue-producer.service';

@Controller()
export class VerifyHasUpdateController {
  private readonly logger = new Logger(VerifyHasUpdateController.name);
  constructor(
    private readonly verifyHasUpdateService: VerifyHasUpdateService,
    private readonly getSetDetailsQueue: GetSetDetailsQueueProducerService,
  ) {}

  @MessagePattern('all-sets-codes')
  async verifyHasUpdate(@Payload() data: string[]) {
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

    const setsInQueuePromises = setsCodesToInsert.map(async (setCode) => {
      await this.getSetDetailsQueue.getSetDetails(setCode);
    });

    await Promise.all(setsInQueuePromises);
    return;
  }
}
