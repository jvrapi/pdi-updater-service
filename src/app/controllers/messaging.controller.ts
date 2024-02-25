import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { RabbitMqConfigService } from '~/infra/messaging/rabbit-mq/config/config.service';
import { VerifyHasUpdatesService } from '../services/sets/verify-has-updates.service';
import * as newrelic from 'newrelic';

@Controller()
export class MessagingController {
  constructor(
    private readonly verifyHasUpdatesService: VerifyHasUpdatesService,
  ) {}

  @RabbitSubscribe(
    RabbitMqConfigService.createSubscribeConfig({
      queue: 'default',
      loggerName: MessagingController.name,
    }),
  )
  async forceUpdate() {
    newrelic.setTransactionName('UpdateForced');
    await this.verifyHasUpdatesService.execute();
  }
}
