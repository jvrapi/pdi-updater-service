import { Injectable, Logger } from '@nestjs/common';
import { SetsDataRepository } from '~/app/repositories';

@Injectable()
export class MarkSetDataAsProcessedService {
  private readonly logger = new Logger(MarkSetDataAsProcessedService.name);
  constructor(private readonly setsDataRepository: SetsDataRepository) {}

  async execute(setCode: string) {
    try {
      await this.setsDataRepository.markAsProcessed(setCode);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
