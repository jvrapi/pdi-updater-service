import { InjectRepository } from '@nestjs/typeorm';
import { ColorsRepository } from '~/app/repositories/colors.repository';
import { Color as ColorEntity } from '../entities/color.entity';
import { Color } from '~/app/entities/color';
import { Repository } from 'typeorm';
import { ColorsMapper } from '../mappers/colors.mapper';
export class TypeOrmColorsRepository implements ColorsRepository {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly repository: Repository<ColorEntity>,
  ) {}

  async listAll(): Promise<Color[]> {
    const colors = await this.repository.find();
    return colors.map(ColorsMapper.toDomain);
  }
}
