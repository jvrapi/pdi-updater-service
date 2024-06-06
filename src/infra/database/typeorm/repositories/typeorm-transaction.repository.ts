import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, IsNull } from 'typeorm';
import { TransactionRepository } from '~/app/repositories/transaction.repository';
import { CreateSetAndCardsParams } from '~/types';
import {
  Card,
  CardColor,
  CardFace,
  CardFormat,
  CardRarity,
  CardVersion,
  Set,
  SetData,
} from '../entities';

export class TypeOrmTransactionRepository implements TransactionRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async createSetAndCards(params: CreateSetAndCardsParams): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const setRepository = queryRunner.manager.getRepository(Set);
      const cardsRepository = queryRunner.manager.getRepository(Card);
      const cardColorRepository = queryRunner.manager.getRepository(CardColor);
      const cardFaceRepository = queryRunner.manager.getRepository(CardFace);
      const cardVersionRepository =
        queryRunner.manager.getRepository(CardVersion);

      const cardFormatRepository =
        queryRunner.manager.getRepository(CardFormat);

      const cardRarityRepository =
        queryRunner.manager.getRepository(CardRarity);

      const setDataRepository = queryRunner.manager.getRepository(SetData);

      const cardsColors = params.cards
        .map((card) => card.cardColors)
        .flat()
        .filter((card) => card);

      const cardsRarities = params.cards
        .map((card) => card.cardRarity)
        .flat()
        .filter((card) => card);

      const cardsVersions = params.cards
        .map((card) => card.cardVersions)
        .flat()
        .filter((card) => card);

      const cardsFormats = params.cards
        .map((card) => card.cardFormats)
        .flat()
        .filter((card) => card);

      const cardFaces = params.cards
        .map((card) => {
          return card.faces?.map((cardFace) => cardFace);
        })
        .flat()
        .filter((card) => card);

      const saveOptions = {
        reload: false,
        chunk: 100,
      };

      await setRepository.insert(params.set);

      await cardsRepository.save(
        params.cards.map((card) => {
          delete card.cardColors;
          delete card.cardFormats;
          delete card.cardRarity;
          delete card.cardVersions;
          delete card.faces;
          return card;
        }),
        saveOptions,
      );

      await cardColorRepository.save(cardsColors, saveOptions);

      await cardRarityRepository.save(cardsRarities, saveOptions);

      await cardVersionRepository.save(cardsVersions, saveOptions);

      await cardFormatRepository.save(cardsFormats, saveOptions);

      await cardFaceRepository.save(cardFaces, saveOptions);

      await setDataRepository.update(
        { setCode: params.set.code, processedAt: IsNull() },
        { processedAt: new Date() },
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
