import { Controller, Logger } from '@nestjs/common';
import { CreateNewSetAndCardsService } from '../services/sets/create-new-set-and-cards.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitMqConfigService } from '~/infra/messaging/rabbit-mq/config/config.service';
import { Sets } from 'scryfall-sdk';
import { CardMapper } from '~/app/mappers/card-mapper';
import { SetMapper } from '~/app/mappers/set-mapper';

interface Message {
  setCode: string;
}

@Controller()
export class CreateSetsController {
  private logger = new Logger(CreateSetsController.name);
  constructor(
    private readonly createNewSetAndCards: CreateNewSetAndCardsService,
  ) {}

  @RabbitSubscribe(
    RabbitMqConfigService.createSubscribeConfig({
      queue: 'createSets',
      loggerName: CreateSetsController.name,
    }),
  )
  async messageHandler(message: Message) {
    const { setCode } = message;
    this.logger.debug(`Start processing set ${setCode}`);
    this.logger.debug(`Getting ${setCode} details from Scryfall API`);
    const setDetails = await Sets.byCode(setCode);
    this.logger.debug(`Getting ${setCode} cards from Scryfall API`);
    const setCards = await setDetails.getCards();
    this.logger.debug(`Formatting ${setCode} data to be saved in database`);
    const set = SetMapper.format(setDetails);
    const cards = setCards.map((card) => CardMapper.format(card));
    const newSet = { ...set, cards };
    this.logger.debug(`Parsing ${setCode} data to responsible service`);
    await this.createNewSetAndCards.execute(newSet);
  }
}