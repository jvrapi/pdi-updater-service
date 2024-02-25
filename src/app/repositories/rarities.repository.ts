import { Rarity } from '../entities/rarity';

export abstract class RaritiesRepository {
  abstract listAll(): Promise<Rarity[]>;
}
