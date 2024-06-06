import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfig } from '~/config';
import { ListSetsDataUnprocessedService } from '../services/set-data';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class ProcessSetDataController {
  private readonly logger = new Logger(ProcessSetDataController.name);

  constructor(
    @InjectQueue('processSetData')
    private readonly processSetDataQueue: Queue,
    private readonly listSetsDataUnprocessedService: ListSetsDataUnprocessedService,
  ) {}

  @RabbitSubscribe(
    RabbitMQConfig.createSubscribeConfig({
      queue: 'processSetData',
      loggerName: ProcessSetDataController.name,
    }),
  )
  async messageHandler() {
    this.logger.log('Processing set data');

    const setsCode = await this.listSetsDataUnprocessedService.execute();

    await Promise.all(
      setsCode.map((setCode) =>
        this.processSetDataQueue.add(
          { setCode },
          {
            removeOnComplete: true,
            removeOnFail: true,
            attempts: 3,
            delay: 500,
          },
        ),
      ),
    );
  }
}
