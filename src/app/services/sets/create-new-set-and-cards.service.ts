import { Injectable, Logger } from '@nestjs/common';
import { Version } from '~/app/entities/version';

import { Color } from '~/app/entities/color';
import { Format } from '~/app/entities/format';
import { Rarity } from '~/app/entities/rarity';
import {
  CreateSetCardsParams,
  CreateCardColorsParams,
  CreateCardVersionParams,
  CreateCardFormatParams,
  NewSetProps,
} from '~/types';

import {
  SetsRepository,
  CardsRepository,
  ColorsRepository,
  VersionsRepository,
  RaritiesRepository,
  FormatsRepository,
  TransactionRepository,
} from '~/app/repositories';

@Injectable()
export class CreateNewSetAndCardsService {
  private logger = new Logger(CreateNewSetAndCardsService.name);

  private _colors: Color[] = [];
  private _formats: Format[] = [];
  private _rarities: Rarity[] = [];
  private _versions: Version[] = [];

  constructor(
    private readonly setsRepository: SetsRepository,
    private readonly cardsRepository: CardsRepository,
    private readonly colorsRepository: ColorsRepository,
    private readonly versionsRepository: VersionsRepository,
    private readonly raritiesRepository: RaritiesRepository,
    private readonly formatsRepository: FormatsRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(data: NewSetProps) {
    try {
      const setId = `${data.code}: ${data.id}`;

      this.logger.debug(`Processing set ${setId}`);

      const setAlreadyExists = await this.setsRepository.getById(data.id);
      if (setAlreadyExists) {
        this.logger.warn(`Set ${setId} already exists`);
        return;
      }
      this.logger.debug(
        `Creating set ${setId} and ${data.cards.length} new cards`,
      );

      if (!this._colors.length) {
        this.logger.debug('Loading colors');
        this._colors = await this.colorsRepository.listAll();
      }

      if (!this._versions.length) {
        this.logger.debug('Loading versions');

        this._versions = await this.versionsRepository.listAll();
      }

      if (!this._rarities.length) {
        this.logger.debug('Loading rarities');
        this._rarities = await this.raritiesRepository.listAll();
      }

      if (!this._formats.length) {
        this.logger.debug('Loading formats');
        this._formats = await this.formatsRepository.listAll();
      }

      const cards: CreateSetCardsParams[] = [];
      this.logger.debug(`Preparing cards of ${setId} to be created`);
      // todo: Inserir cores, raridade, versões e formatos
      data.cards.forEach((card) => {
        const cardColors = card.colors.reduce<CreateCardColorsParams[]>(
          (acc, curr) => {
            const color = this._colors.find(({ color }) => color === curr);
            if (color) {
              acc.push({ cardId: card.id, colorId: color.id });
            } else {
              this.logger.warn(`Color ${curr} not found for card ${card.id}`);
            }
            return acc;
          },
          [],
        );

        const cardVersions = card.versions.reduce<CreateCardVersionParams[]>(
          (acc, curr) => {
            const version = this._versions.find(
              (version) => version.name === curr,
            );
            if (version) {
              acc.push({ cardId: card.id, versionId: version.id });
            } else {
              this.logger.warn(`Version ${curr} not found for card ${card.id}`);
            }
            return acc;
          },
          [],
        );

        const cardFormats = card.formats.reduce<CreateCardFormatParams[]>(
          (acc, curr) => {
            const format = this._formats.find(
              (format) => format.name === curr.name,
            );
            if (format) {
              acc.push({
                cardId: card.id,
                formatId: format.id,
                status: curr.status,
              });
            } else {
              this.logger.warn(`Format ${curr} not found for card ${card.id}`);
            }
            return acc;
          },
          [],
        );

        const cardRarity = this._rarities.find(
          (rarity) => rarity.name === card.rarity,
        );

        if (
          !cardRarity ||
          cardColors.length !== card.colors.length ||
          cardVersions.length !== card.versions.length ||
          cardFormats.length !== card.formats.length
        ) {
          this.logger.debug('Colors', cardColors);
          this.logger.debug('Versions', cardVersions);
          this.logger.debug('Formats', cardFormats);
          this.logger.debug('Rarity', cardRarity);
          throw new Error(`Invalid data for card ${card.id}`);
        }

        const cardData: CreateSetCardsParams = {
          borderColor: card.borderColor,
          cmc: card.cmc ?? 0,
          collectionId: card.collectionId,
          effectText: card.effectText,
          flavorText: card.flavorText,
          frame: card.frame,
          id: card.id,
          externalId: card.externalId,
          imageUri: card.imageUri,
          isFoundInBooster: card.isFoundInBooster,
          isReprint: card.isReprint,
          isReserved: card.isReserved,
          isStorySpotlight: card.isStorySpotlight,
          isVariant: card.isVariant,
          language: card.language,
          layout: card.layout,
          loyalty: card.loyalty,
          manaCost: card.manaCost,
          name: card.name,
          securityStamp: card.securityStamp,
          setId: card.setId,
          typeLine: card.typeLine,
          faces: [],
          cardRarity: {
            cardId: card.id,
            rarityId: cardRarity.id,
          },
          cardColors,
          cardVersions,
          cardFormats,
        };

        if (card.faces.length) {
          card.faces.forEach((face) => {
            cards.push({
              borderColor: card.borderColor,
              cmc: face.cmc ?? 0,
              collectionId: card.collectionId,
              effectText: face.effectText,
              flavorText: face.flavorText,
              frame: card.frame,
              id: face.id,
              externalId: face.externalId,
              imageUri: face.imageUri,
              isFoundInBooster: card.isFoundInBooster,
              isReprint: card.isReprint,
              isReserved: card.isReserved,
              isStorySpotlight: card.isStorySpotlight,
              isVariant: card.isVariant,
              language: face.language,
              layout: card.layout,
              loyalty: card.loyalty,
              manaCost: face.manaCost,
              name: face.name,
              securityStamp: card.securityStamp,
              setId: face.setId,
              typeLine: face.typeLine,
            });

            cardData.faces.push({
              cardId: card.id,
              faceId: face.id,
            });
          });
        }

        cards.push(cardData);
      });

      await this.transactionRepository.createSetAndCards({
        set: data,
        cards,
      });

      this.logger.debug(`set ${setId} created successfully!`);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
