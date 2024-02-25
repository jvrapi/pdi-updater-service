import { InjectRepository } from '@nestjs/typeorm';
import { Version as VersionEntity } from '../entities/version.entity';
import { Repository } from 'typeorm';
import { Version } from '~/app/entities/version';
import { VersionsMapper } from '../mappers/versions.mapper';
import { VersionsRepository } from '~/app/repositories/versions.repository';

export class TypeOrmVersionsRepository implements VersionsRepository {
  constructor(
    @InjectRepository(VersionEntity)
    private readonly repository: Repository<VersionEntity>,
  ) {}

  public async listAll(): Promise<Version[]> {
    const versions = await this.repository.find();
    return versions.map(VersionsMapper.toDomain);
  }
}
