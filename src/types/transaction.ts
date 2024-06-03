import { CreateSetCardsParams } from './card';
import { CreateSetParams } from './set';

export interface CreateSetAndCardsParams {
  set: CreateSetParams;
  cards: CreateSetCardsParams[];
}
