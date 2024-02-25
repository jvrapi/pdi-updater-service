import { Injectable, Logger } from '@nestjs/common';
import { GetAllSetsRegisteredService } from './get-all-sets-registered.service';
import { Queue } from 'bull';
import { GetUncreatedSetCodesService } from './get-uncreated-set-codes.service';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class VerifyHasUpdatesService {
  private logger = new Logger(VerifyHasUpdatesService.name);
  constructor(
    @InjectQueue('create-set-queue')
    private readonly getSetDetailsQueue: Queue,
    private readonly getAllSetsRegisteredService: GetAllSetsRegisteredService,
    private readonly getUncreatedSetCodesService: GetUncreatedSetCodesService,
  ) {}
  async execute() {
    const allSetsCodesRegistered =
      await this.getAllSetsRegisteredService.execute();

    const setsCodesToInsert = await this.getUncreatedSetCodesService.execute(
      allSetsCodesRegistered.map((set) => set.code),
    );

    if (!setsCodesToInsert.length) {
      this.logger.log('No updates found');
      return;
    }

    this.logger.log(
      `${setsCodesToInsert.length} sets codes not registered has been found`,
    );

    this.logger.log('Update process has been initiated');

    const getSetDetailsPromises = setsCodesToInsert.map(async (setCode) => {
      await this.getSetDetailsQueue.add('create-set-job', setCode, {
        removeOnComplete: true,
        removeOnFail: true,
      });
    });

    await Promise.all(getSetDetailsPromises);
  }
}
