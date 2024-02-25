import { Rarity } from '~/app/entities/rarity';
import { Rarity as Raw } from '../entities/rarity.entity';

export class RaritiesMapper {
  static toDomain(raw: Raw) {
    return new Rarity({
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
