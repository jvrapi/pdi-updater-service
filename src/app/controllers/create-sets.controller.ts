import { Controller, Logger } from '@nestjs/common';
import { CreateNewSetAndCardsService } from '../services/sets/create-new-set-and-cards.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Sets } from 'scryfall-sdk';
import { CardMapper } from '~/app/mappers/card-mapper';
import { SetMapper } from '~/app/mappers/set-mapper';
import { RabbitMQConfig } from '~/config';
import { CreateSetDataService } from '../services/set-data';

interface Message {
  setCode: string;
}

@Controller()
export class CreateSetsController {
  private logger = new Logger(CreateSetsController.name);
  constructor(private readonly createSetDataService: CreateSetDataService) {}

  @RabbitSubscribe({
    ...RabbitMQConfig.createSubscribeConfig({
      queue: 'createSets',
      loggerName: CreateSetsController.name,
    }),
    queueOptions: {
      channel: 'createSets',
    },
  })
  async messageHandler(message: Message) {
    this.logger.log(`Saving ${message.setCode} in database`);
    await this.createSetDataService.execute(message.setCode);

    // const { setCode } = message;
    // this.logger.log(`Start processing set ${setCode}`);
    // this.logger.log(`Getting ${setCode} details from Scryfall API`);
    // const setDetails = await Sets.byCode(setCode);
    // this.logger.log(`Getting ${setCode} cards from Scryfall API`);
    // const setCards = await setDetails.getCards();
    // this.logger.log(`Formatting ${setCode} data to be saved in database`);
    // const set = SetMapper.format(setDetails);

    // const cards = setCards
    //   .map((card) => CardMapper.format(card))
    //   .map((card) => {
    //     card.faces.forEach((face) => {
    //       face.setId = set.id;
    //     });
    //     return {
    //       ...card,
    //       setId: set.id,
    //     };
    //   });

    // const newSet = { ...set, cards };
    // this.logger.log(`Parsing ${setCode} data to responsible service`);
    // await this.createNewSetAndCards.execute(newSet);
  }
}
