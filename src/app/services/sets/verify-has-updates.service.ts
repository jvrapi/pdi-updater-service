import { Injectable, Logger } from '@nestjs/common';
import { GetAllSetsRegisteredService } from './get-all-sets-registered.service';
import { GetUncreatedSetCodesService } from './get-uncreated-set-codes.service';

@Injectable()
export class VerifyHasUpdatesService {
  private logger = new Logger(VerifyHasUpdatesService.name);
  constructor(
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
  }
}
