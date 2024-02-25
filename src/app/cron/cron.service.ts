import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VerifyHasUpdatesService } from '../services/sets/verify-has-updates.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    private readonly verifyHasUpdateService: VerifyHasUpdatesService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async execute() {
    this.logger.log(
      'Cron job has been trigged. Checking for new sets to be registered',
    );

    await this.verifyHasUpdateService.execute();
  }
}
