import { Format } from '~/app/entities/format';
import { Format as Raw } from '../entities/format.entity';

export class FormatsMapper {
  static toDomain(raw: Raw): Format {
    return new Format({
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
