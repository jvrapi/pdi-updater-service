import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RabbitMQConfig } from '~/config';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private amqpConnection: AmqpConnection) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async execute() {
    this.logger.log(
      'Cron job has been trigged. Checking for new sets to be registered',
    );

    await this.amqpConnection.publish(
      RabbitMQConfig.queues.verifyHasUpdates.exchange,
      RabbitMQConfig.queues.verifyHasUpdates.routingKey,
      {},
    );
  }
}
