import { Module } from '@nestjs/common';
import { ScryfallRepository } from '~/app/repositories';
import { ScryfallSdkRepository } from '../scryfall/repositories';

@Module({
  providers: [
    {
      provide: ScryfallRepository,
      useClass: ScryfallSdkRepository,
    },
  ],
  exports: [ScryfallRepository],
})
export class ScryfallModule {}
