import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
import { TransactionRepository } from '~/app/repositories/transaction.repository';
import {
  CreateCardColorsParams,
  CreateCardFaceParams,
  CreateCardFormatParams,
  CreateCardRarityParams,
  CreateCardVersionParams,
  CreateSetAndCardsParams,
  CreateSetCardsParams,
} from '~/types';
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
import { Logger } from '@nestjs/common';

export class TypeOrmTransactionRepository implements TransactionRepository {
  private readonly queryBuilder: SelectQueryBuilder<any>;
  private readonly queryRunner: QueryRunner;
  private logger = new Logger(TypeOrmTransactionRepository.name);
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.queryRunner = this.dataSource.createQueryRunner();
    this.queryBuilder = this.dataSource.createQueryBuilder(this.queryRunner);
  }
  async createSetAndCards(params: CreateSetAndCardsParams): Promise<void> {
    try {
      await this.queryRunner.connect();
      await this.queryRunner.startTransaction();

      this.logger.log('Formatting card relations to insert into database');

      const {
        cardColorsChunks,
        cardFacesChunks,
        cardFormatsChunks,
        cardRaritiesChunks,
        cardVersionsChunks,
      } = this.getCardRelationsData(params.cards);

      const cardChunks: CreateSetCardsParams[][] = [];

      this.logger.log('Chunking cards to insert into database');

      for (let i = 0; i < params.cards.length; i += 100) {
        const chunk = params.cards.slice(i, i + 100);
        cardChunks.push(
          chunk.map((card) => {
            delete card.cardColors;
            delete card.cardFormats;
            delete card.cardRarity;
            delete card.cardVersions;
            delete card.faces;
            return card;
          }),
        );
      }

      this.logger.log('Inserting set into database');

      await this.queryBuilder.insert().into(Set).values(params.set).execute();

      this.logger.log('Inserting cards into database');

      for (const chunk of cardChunks) {
        await this.queryBuilder.insert().into(Card).values(chunk).execute();
      }

      this.logger.log('Inserting card colors into database');

      for (const chunk of cardColorsChunks) {
        await this.queryBuilder
          .insert()
          .into(CardColor)
          .values(chunk)
          .execute();
      }

      this.logger.log('Inserting card rarities into database');

      for (const chunk of cardRaritiesChunks) {
        await this.queryBuilder
          .insert()
          .into(CardRarity)
          .values(chunk)
          .execute();
      }

      this.logger.log('Inserting card versions into database');

      for (const chunk of cardVersionsChunks) {
        await this.queryBuilder
          .insert()
          .into(CardVersion)
          .values(chunk)
          .execute();
      }

      this.logger.log('Inserting card formats into database');

      for (const chunk of cardFormatsChunks) {
        await this.queryBuilder
          .insert()
          .into(CardFormat)
          .values(chunk)
          .execute();
      }

      this.logger.log('Inserting card faces into database');

      for (const chunk of cardFacesChunks) {
        await this.queryBuilder.insert().into(CardFace).values(chunk).execute();
      }

      this.logger.log('Updating set data as processed');

      await this.queryBuilder
        .update(SetData)
        .set({ processedAt: new Date() })
        .where({ setCode: params.set.code })
        .execute();

      this.logger.log('Committing transaction');

      await this.queryRunner.commitTransaction();
    } catch (error) {
      this.queryRunner.rollbackTransaction();
      throw error;
    }
  }

  private getCardRelationsData(cards: CreateSetCardsParams[]) {
    const cardsColors = cards
      .map((card) => card.cardColors)
      .flat()
      .filter((card) => card);

    const cardsRarities = cards
      .map((card) => card.cardRarity)
      .flat()
      .filter((card) => card);

    const cardsVersions = cards
      .map((card) => card.cardVersions)
      .flat()
      .filter((card) => card);

    const cardsFormats = cards
      .map((card) => card.cardFormats)
      .flat()
      .filter((card) => card);

    const cardFaces = cards
      .map((card) => {
        return card.faces?.map((cardFace) => cardFace);
      })
      .flat()
      .filter((card) => card);

    const cardColorsChunks: CreateCardColorsParams[][] = [];
    const cardRaritiesChunks: CreateCardRarityParams[][] = [];
    const cardVersionsChunks: CreateCardVersionParams[][] = [];
    const cardFormatsChunks: CreateCardFormatParams[][] = [];
    const cardFacesChunks: CreateCardFaceParams[][] = [];

    for (let i = 0; i < cardsColors.length; i += 100) {
      const chunk = cardsColors.slice(i, i + 100);
      cardColorsChunks.push(chunk);
    }

    for (let i = 0; i < cardsRarities.length; i += 100) {
      const chunk = cardsRarities.slice(i, i + 100);
      cardRaritiesChunks.push(chunk);
    }

    for (let i = 0; i < cardsVersions.length; i += 100) {
      const chunk = cardsVersions.slice(i, i + 100);
      cardVersionsChunks.push(chunk);
    }

    for (let i = 0; i < cardsFormats.length; i += 100) {
      const chunk = cardsFormats.slice(i, i + 100);
      cardFormatsChunks.push(chunk);
    }

    for (let i = 0; i < cardFaces.length; i += 100) {
      const chunk = cardFaces.slice(i, i + 100);
      cardFacesChunks.push(chunk);
    }

    return {
      cardColorsChunks,
      cardRaritiesChunks,
      cardVersionsChunks,
      cardFormatsChunks,
      cardFacesChunks,
    };
  }
}
