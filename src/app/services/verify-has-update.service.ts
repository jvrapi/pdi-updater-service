import { Injectable, Logger } from '@nestjs/common';
import { Sets } from 'scryfall-sdk';

@Injectable()
export class VerifyHasUpdateService {
  private readonly logger = new Logger(VerifyHasUpdateService.name);
  async execute(setsCodes: string[]) {
    this.logger.log('Check for updates');

    const allSets = await Sets.all();

    if (allSets.length === setsCodes.length) {
      return [];
    }

    const allSetsCodes = allSets.map((set) => set.code);

    const setsCodesNotRegistered = allSetsCodes.filter(
      (code) =>
        !setsCodes.some(
          (registeredSetCode) =>
            code.toLowerCase() === registeredSetCode.toLowerCase(),
        ),
    );

    return setsCodesNotRegistered;
  }
}
