import { Injectable, Logger } from '@nestjs/common';
import { SetsRepository } from '~/app/repositories/sets-repository';

@Injectable()
export class GetAllSetsRegisteredService {
  private logger = new Logger(GetAllSetsRegisteredService.name);
  constructor(private readonly setsRepository: SetsRepository) {}

  async execute() {
    try {
      return this.setsRepository.getAllSets();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
