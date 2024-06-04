import { InjectRepository } from '@nestjs/typeorm';
import { SetsDataRepository } from '~/app/repositories';
import { SetData } from '../entities';
import { IsNull, Repository } from 'typeorm';
import { uuidv7 } from 'uuidv7';

export class TypeOrmSetsDataRepository implements SetsDataRepository {
  constructor(
    @InjectRepository(SetData)
    private readonly repository: Repository<SetData>,
  ) {}

  async create(setCode: string): Promise<void> {
    await this.repository.insert({ setCode, id: uuidv7() });
  }

  async listAllUnprocessed(): Promise<string[]> {
    const setsData = await this.repository.find({
      where: {
        processedAt: IsNull(),
      },
    });

    return setsData.map((setData) => setData.setCode);
  }

  async markAsProcessed(setCode: string): Promise<void> {
    await this.repository.update(
      { setCode, processedAt: IsNull() },
      { processedAt: new Date() },
    );
  }
}
