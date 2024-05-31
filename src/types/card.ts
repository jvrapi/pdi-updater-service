export interface CardProps {
  id: string;
  externalId: string;
  setId: string;
  imageUri: string;
  name: string;
  language: string;
  layout: string | null;
  cmc: number | null;
  typeLine: string | null;
  collectionId: string | null;
  frame: string | null;
  borderColor: string | null;
  manaCost: string | null;
  loyalty: string | null;
  securityStamp: string | null;
  effectText: string | null;
  flavorText: string | null;
  isReserved: boolean | null;
  isReprint: boolean | null;
  isVariant: boolean | null;
  isFoundInBooster: boolean | null;
  isStorySpotlight: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type FaceProps = Pick<
  CardProps,
  | 'id'
  | 'externalId'
  | 'imageUri'
  | 'name'
  | 'manaCost'
  | 'effectText'
  | 'flavorText'
  | 'language'
  | 'typeLine'
  | 'setId'
  | 'cmc'
  | 'createdAt'
  | 'updatedAt'
>;

export type CreateCardParams = Omit<CardProps, 'createdAt' | 'updatedAt'>;

export interface CreateCardVersionParams {
  cardId: string;
  versionId: string;
}

export interface CreateCardFormatParams {
  cardId: string;
  formatId: string;
  status: string;
}

export interface CreateCardRarityParams {
  cardId: string;
  rarityId: string;
}

export interface CreateCardColorsParams {
  cardId: string;
  colorId: string;
}
