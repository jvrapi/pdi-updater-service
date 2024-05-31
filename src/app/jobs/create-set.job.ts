import { Sets } from 'scryfall-sdk';
import { CardMapper } from '~/app/mappers/card-mapper';
import { SetMapper } from '~/app/mappers/set-mapper';
import { Logger } from '@nestjs/common';
import { CreateNewSetAndCardsService } from '../services/sets/create-new-set-and-cards.service';

export class CreateSetJob {
  private logger = new Logger(CreateSetJob.name);
  constructor(
    private readonly createNewSetAndCards: CreateNewSetAndCardsService,
  ) {}

  async execute(setCode: string) {
    try {
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
    } catch (error) {
      this.logger.error(error);
    }
  }
}
