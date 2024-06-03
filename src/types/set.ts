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

export type CreateSetParams = Omit<SetProps, 'createdAt' | 'updatedAt'>;
