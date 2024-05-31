import { InjectRepository } from '@nestjs/typeorm';
import { Set } from '~/app/entities/set';
import { SetsRepository } from '~/app/repositories/sets-repository';

import { Repository } from 'typeorm';
import { Set as SetEntity } from '../entities/set.entity';
import { SetsMapper } from '../mappers/sets.mapper';
import { CreateSetParams } from '~/types/set';

export class TypeOrmSetsRepository implements SetsRepository {
  constructor(
    @InjectRepository(SetEntity)
    private readonly setRepository: Repository<SetEntity>,
  ) {}

  async getAllSets(): Promise<Set[]> {
    const sets = await this.setRepository.find();
    return sets.map(SetsMapper.toDomain);
  }

  async getById(id: string): Promise<Set> {
    const set = await this.setRepository.findOne({
      where: { id },
    });

    return set ? SetsMapper.toDomain(set) : null;
  }

  async create(set: CreateSetParams): Promise<void> {
    const newSet = this.setRepository.create(set);
    await this.setRepository.save(newSet, {
      reload: false,
    });
  }
}
