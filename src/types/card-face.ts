export interface CardFaceProps {
  cardId: string;
  faceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCardFaceParams = Omit<
  CardFaceProps,
  'createdAt' | 'updatedAt'
>;
