import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from '~/app/modules/env.module';
import { EnvService } from '~/app/services/env';
import { TypeOrmConfigService } from '../database/typeorm/config';
import {
  Card,
  CardColor,
  CardFace,
  CardFormat,
  CardRarity,
  CardVersion,
  Color,
  Format,
  Rarity,
  Set,
  SetData,
  Version,
} from '../database/typeorm/entities';
import {
  CardsRepository,
  SetsRepository,
  ColorsRepository,
  VersionsRepository,
  RaritiesRepository,
  FormatsRepository,
  SetsDataRepository,
} from '~/app/repositories';
import {
  TypeOrmCardsRepository,
  TypeOrmSetsRepository,
  TypeOrmColorsRepository,
  TypeOrmVersionsRepository,
  TypeOrmRaritiesRepository,
  TypeOrmFormatsRepository,
  TypeOrmTransactionRepository,
  TypeOrmSetsDataRepository,
} from '../database/typeorm/repositories';
import { TransactionRepository } from '~/app/repositories/transaction.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvService],
      imports: [EnvModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([
      Card,
      Set,
      CardFace,
      CardRarity,
      CardVersion,
      CardFormat,
      CardColor,
      Color,
      Version,
      Rarity,
      Format,
      SetData,
    ]),
  ],
  providers: [
    {
      provide: CardsRepository,
      useClass: TypeOrmCardsRepository,
    },
    {
      provide: SetsRepository,
      useClass: TypeOrmSetsRepository,
    },
    {
      provide: ColorsRepository,
      useClass: TypeOrmColorsRepository,
    },

    {
      provide: VersionsRepository,
      useClass: TypeOrmVersionsRepository,
    },
    {
      provide: RaritiesRepository,
      useClass: TypeOrmRaritiesRepository,
    },
    {
      provide: FormatsRepository,
      useClass: TypeOrmFormatsRepository,
    },
    {
      provide: TransactionRepository,
      useClass: TypeOrmTransactionRepository,
    },
    {
      provide: SetsDataRepository,
      useClass: TypeOrmSetsDataRepository,
    },
  ],
  exports: [
    CardsRepository,
    SetsRepository,
    ColorsRepository,
    VersionsRepository,
    RaritiesRepository,
    FormatsRepository,
    TransactionRepository,
    SetsDataRepository,
  ],
})
export class DatabaseModule {}
