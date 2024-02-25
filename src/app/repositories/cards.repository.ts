import { Card } from '~/app/entities/card';

export interface FindByFiltersProps {
  take?: number;
  skip?: number;
  name?: string;
  type?: string;
  ids?: string[];
}

export abstract class CardsRepository {
  abstract findByFilters(data: FindByFiltersProps): Promise<Card[]>;
}
