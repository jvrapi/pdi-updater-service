import { InjectRepository } from '@nestjs/typeorm';
import { RaritiesRepository } from '~/app/repositories/rarities.repository';
import { Rarity as RarityEntity } from '../entities/rarity.entity';
import { Repository } from 'typeorm';
import { RaritiesMapper } from '../mappers/rarities.mapper';
import { Rarity } from '~/app/entities/rarity';

export class TypeOrmRaritiesRepository implements RaritiesRepository {
  constructor(
    @InjectRepository(RarityEntity)
    private readonly repository: Repository<RarityEntity>,
  ) {}

  public async listAll(): Promise<Rarity[]> {
    const rarities = await this.repository.find();
    return rarities.map(RaritiesMapper.toDomain);
  }
}
