import { InjectRepository } from '@nestjs/typeorm';
import { FormatsRepository } from '~/app/repositories/formats.repository';

import { Format as FormatEntity } from '../entities/format.entity';
import { Repository } from 'typeorm';
import { FormatsMapper } from '../mappers/formats.mapper';
import { Format } from '~/app/entities/format';

export class TypeOrmFormatsRepository implements FormatsRepository {
  constructor(
    @InjectRepository(FormatEntity)
    private readonly repository: Repository<FormatEntity>,
  ) {}

  async listAll(): Promise<Format[]> {
    const formats = await this.repository.find();
    return formats.map(FormatsMapper.toDomain);
  }
}
