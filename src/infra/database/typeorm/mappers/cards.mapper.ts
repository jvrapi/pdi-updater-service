import { Card } from '~/app/entities/card';

import { Card as RawResponse } from '../entities/card.entity';
import { SetsMapper } from './sets.mapper';

export class CardsMapper {
  static toDomain(raw: RawResponse): Card {
    const card = new Card({
      id: raw.id,
      externalId: raw.externalId,
      setId: raw.setId,
      name: raw.name,
      cmc: raw.cmc,
      imageUri: raw.imageUri,
      borderColor: raw.borderColor,
      collectionId: raw.collectionId,
      frame: raw.frame,
      isFoundInBooster: raw.isFoundInBooster,
      language: raw.language,
      isReserved: raw.isReserved,
      isStorySpotlight: raw.isStorySpotlight,
      isVariant: raw.isVariant,
      layout: raw.layout,
      loyalty: raw.loyalty,
      manaCost: raw.manaCost,
      securityStamp: raw.securityStamp,
      effectText: raw.effectText,
      flavorText: raw.flavorText,
      typeLine: raw.typeLine,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      isReprint: raw.isReprint,
    });

    if (raw.set) {
      card.set = SetsMapper.toDomain(raw.set);
    }

    return card;
  }
}
