import { Version } from '~/app/entities/version';
import { Version as Raw } from '../entities/version.entity';
export class VersionsMapper {
  static toDomain(raw: Raw): Version {
    return new Version({
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
