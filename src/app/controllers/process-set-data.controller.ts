import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfig } from '~/config';
import { CreateNewSetAndCardsService } from '../services/sets';

@Controller()
export class ProcessSetDataController {
  private readonly logger = new Logger(ProcessSetDataController.name);

  constructor(
    private readonly createNewSetAndCardsService: CreateNewSetAndCardsService,
  ) {}

  @RabbitSubscribe(
    RabbitMQConfig.createSubscribeConfig({
      queue: 'processSetData',
      loggerName: ProcessSetDataController.name,
    }),
  )
  async messageHandler() {
    this.logger.log('Processing set data');
    await this.createNewSetAndCardsService.execute();
  }
}
