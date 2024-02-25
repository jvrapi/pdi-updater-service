export interface NewCardFaceProps {
  id: string;
  imageUri: string;
  name: string;
  manaCost: string | null;
  effectText: string | null;
  flavorText: string | null;
  language: string;
  typeLine: string;
  setId: string;
  colors: string[];
  faceOfId: string;
  cmc: number | null;
}

interface Format {
  name: string;
  status: string;
}

export interface NewCardProps {
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
  formats: Format[];
  versions: string[];
  id: string;
  setId: string;
  imageUri: string | null;
  faces: NewCardFaceProps[];
}

export interface NewSetProps {
  id: string;
  name: string;
  code: string;
  isDigital: boolean;
  isFoilOnly: boolean;
  releasedAt: string;
  type: string;
  iconUri: string;
  cards: NewCardProps[];
}
