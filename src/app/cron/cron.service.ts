import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendMessageService } from '../services/send-message.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(private sendMessage: SendMessageService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async execute() {
    this.logger.log(
      'Cron job has been trigged. Send message to get all collections',
    );
    await this.sendMessage.execute({
      pattern: 'get-all-sets',
      message: '',
    });
  }
}
