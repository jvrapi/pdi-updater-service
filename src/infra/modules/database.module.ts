import { Module } from '@nestjs/common';
import { CardsRepository } from '~/app/repositories/cards.repository';
import { SetsRepository } from '~/app/repositories/sets-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../database/typeorm/config/database-config.service';
import { Card } from '../database/typeorm/entities/card.entity';
import { Set } from '../database/typeorm/entities/set.entity';
import { TypeOrmCardsRepository } from '../database/typeorm/repositories/typeorm-cards.repository';
import { TypeOrmSetsRepository } from '../database/typeorm/repositories/typeorm-sets.repository';
import { CardFace } from '../database/typeorm/entities/card-face.entity';
import { Color } from '../database/typeorm/entities/color.entity';
import { Version } from '../database/typeorm/entities/version.entity';
import { Rarity } from '../database/typeorm/entities/rarity.entity';
import { Format } from '../database/typeorm/entities/format.entity';
import { CardRarity } from '../database/typeorm/entities/card-rarity.entity';
import { CardVersion } from '../database/typeorm/entities/card-version.entity';
import { CardFormat } from '../database/typeorm/entities/card-format.entity';
import { ColorsRepository } from '~/app/repositories/colors.repository';
import { RaritiesRepository } from '~/app/repositories/rarities.repository';
import { VersionsRepository } from '~/app/repositories/versions.repository';
import { TypeOrmColorsRepository } from '../database/typeorm/repositories/typeorm-colors.repository';
import { TypeOrmRaritiesRepository } from '../database/typeorm/repositories/typeorm-rarities.repository';
import { TypeOrmVersionsRepository } from '../database/typeorm/repositories/typeorm-versions.repository';
import { FormatsRepository } from '~/app/repositories/formats.repository';
import { TypeOrmFormatsRepository } from '../database/typeorm/repositories/typeorm-formats.repository';
import { CardColor } from '../database/typeorm/entities/card-color.entity';
import { EnvModule } from '~/app/modules/env.module';
import { EnvService } from '~/app/services/env';

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
  ],
  exports: [
    CardsRepository,
    SetsRepository,
    ColorsRepository,
    VersionsRepository,
    RaritiesRepository,
    FormatsRepository,
  ],
})
export class DatabaseModule {}
