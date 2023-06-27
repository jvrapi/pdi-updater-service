import { Injectable, Logger } from '@nestjs/common';
import { SendMessageService } from '../send-message/send-message.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(private sendMessage: SendMessageService) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_SECOND)
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
