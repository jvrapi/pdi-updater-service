import { Color } from '~/app/entities/color';
import { Color as Raw } from '../entities/color.entity';
export class ColorsMapper {
  static toDomain(raw: Raw) {
    return new Color({
      id: raw.id,
      name: raw.name,
      color: raw.color,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
