import {
  CreateCardColorsParams,
  CreateCardFormatParams,
  CreateCardParams,
  CreateCardRarityParams,
  CreateCardVersionParams,
} from './card';
import { CreateCardFaceParams } from './card-face';

export interface SetProps {
  id: string;
  iconUri: string;
  code: string;
  name: string;
  type: string;
  releasedAt: string;
  isDigital: boolean;
  isFoilOnly: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateSetCardsParams = CreateCardParams & {
  faces?: CreateCardFaceParams[];
  cardVersions: CreateCardVersionParams[];
  cardFormats: CreateCardFormatParams[];
  cardColors: CreateCardColorsParams[];
  cardRarity: CreateCardRarityParams;
};

export type CreateSetParams = Omit<SetProps, 'createdAt' | 'updatedAt'> & {
  cards: CreateSetCardsParams[];
};
