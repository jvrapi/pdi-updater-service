import { Injectable, Logger } from '@nestjs/common';
import { SetsDataRepository } from '~/app/repositories';

@Injectable()
export class CreateSetDataService {
  private readonly logger = new Logger(CreateSetDataService.name);
  constructor(private readonly setsDataRepository: SetsDataRepository) {}

  async execute(setCode: string) {
    try {
      await this.setsDataRepository.create(setCode);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
