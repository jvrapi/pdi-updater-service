import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Set, Sets } from 'scryfall-sdk';
import { CardMapper } from '~/app/mappers/card-mapper';
import { SetMapper } from '~/app/mappers/set-mapper';
import { SendMessageService } from '~/app/send-message/send-message.service';

@Processor('get-set-details-queue')
export class GetSetDetailsQueueConsumerService {
  constructor(private readonly sendMessageService: SendMessageService) {}

  @Process('get-set-details-job')
  async getSetDetails(job: Job<string>) {
    const { data: setCode } = job;
    const setDetails = await Sets.byCode(setCode);
    const setCards = await setDetails.getCards();
    const set = SetMapper.toCardsService(setDetails);
    const cards = setCards.map((card) => CardMapper.toCardsService(card));
    const message = { ...set, cards };
    this.sendMessageService.execute({
      pattern: 'new-set',
      message,
    });
  }
}
