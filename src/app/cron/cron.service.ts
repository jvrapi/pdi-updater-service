import { Injectable, Logger } from '@nestjs/common';
import { SendMessageService } from '../send-message/send-message.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(private sendMessage: SendMessageService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron('50 20 * * *')
  async execute() {
    this.logger.log(`${new Date().toISOString()} - Cron job has been trigged`);
    this.logger.log('Send message to get all collections');
    await this.sendMessage.execute({
      pattern: 'get-all-sets',
      message: '',
    });
  }
}
