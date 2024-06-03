import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
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

      await setRepository.insert(params.set);

      await cardsRepository.insert(params.cards);

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

      await cardColorRepository.insert(cardsColors);

      await cardRarityRepository.insert(cardsRarities);

      await cardVersionRepository.insert(cardsVersions);

      await cardFormatRepository.insert(cardsFormats);

      await cardFaceRepository.insert(cardFaces);

      await queryRunner.commitTransaction();
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
