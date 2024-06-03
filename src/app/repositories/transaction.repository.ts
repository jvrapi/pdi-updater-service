import { CreateSetAndCardsParams } from '~/types';

export abstract class TransactionRepository {
  abstract createSetAndCards(params: CreateSetAndCardsParams): Promise<void>;
}
