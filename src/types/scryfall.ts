import { Format as ScryFormat } from 'scryfall-sdk';

export type ScryfallFormatName = keyof typeof ScryFormat;

export enum ScryFallVersions {
  oversized = 'oversized',
  foil = 'foil',
  nonfoil = 'nonFoil',
  promo = 'promo',
  textLess = 'textLess',
}

export type ScryfallVersionName = keyof typeof ScryFallVersions;

export interface ScryfallFormat {
  name: ScryfallFormatName;
  status: string;
}

export interface ScryfallVersion {
  oversized: boolean;
  promo: boolean;
  textLess: boolean;
}

export interface ScryfallFace {
  id: string;
  externalId: string;
  imageUri: string;
  name: string;
  manaCost: string | null;
  effectText: string | null;
  flavorText: string | null;
  language: string;
  typeLine: string;
  setId: string;
  colors: string[];
  cmc: number | null;
}

export interface ScryfallSet {
  id: string;
  externalId: string;
  name: string;
  code: string;
  isDigital: boolean;
  isFoilOnly: boolean;
  releasedAt: string;
  type: string;
  iconUri: string;
}

export interface ScryfallCard {
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
  rarity: string | null;
  isReserved: boolean | null;
  isReprint: boolean | null;
  isVariant: boolean | null;
  isFoundInBooster: boolean | null;
  isStorySpotlight: boolean | null;
  colors: string[];
  formats: ScryfallFormat[];
  versions: string[];
  id: string;
  externalId: string;
  setId: string;
  imageUri: string | null;
  faces: ScryfallFace[];
}

export type GetSetDetailsResponse = ScryfallSet & { cards: ScryfallCard[] };
