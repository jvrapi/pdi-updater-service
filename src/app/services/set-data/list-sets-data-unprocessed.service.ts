import { Injectable, Logger } from '@nestjs/common';
import { SetsDataRepository } from '~/app/repositories';

@Injectable()
export class ListSetsDataUnprocessedService {
  private readonly logger = new Logger(ListSetsDataUnprocessedService.name);
  constructor(private readonly setsDataRepository: SetsDataRepository) {}

  async execute() {
    try {
      return await this.setsDataRepository.listAllUnprocessed();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
