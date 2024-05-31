import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, Logger } from '@nestjs/common';
import * as newrelic from 'newrelic';
import {
  GetAllSetsRegisteredService,
  GetUncreatedSetCodesService,
} from '../services/sets';
import { RabbitMQConfig } from '~/config';

@Controller()
export class VerifyHasUpdatesController {
  private logger = new Logger(VerifyHasUpdatesController.name);

  constructor(
    private readonly getAllSetsRegisteredService: GetAllSetsRegisteredService,
    private readonly getUncreatedSetCodesService: GetUncreatedSetCodesService,
    private amqpConnection: AmqpConnection,
  ) {}

  @RabbitSubscribe(
    RabbitMQConfig.createSubscribeConfig({
      queue: 'verifyHasUpdates',
      loggerName: VerifyHasUpdatesController.name,
    }),
  )
  async forceUpdate() {
    newrelic.setTransactionName('UpdateForced');
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

    setsCodesToInsert.forEach((setCode) => {
      this.amqpConnection.publish(
        RabbitMQConfig.queues.createSets.exchange,
        RabbitMQConfig.queues.createSets.routingKey,
        { setCode },
      );
    });
  }
}
