import {
  Card as ScryCard,
  CardFinish as ScryCardFinish,
  Color,
  Legalities,
} from 'scryfall-sdk';
import { uuidv7 } from 'uuidv7';

import {
  ScryFallVersions,
  ScryfallCard,
  ScryfallFace,
  ScryfallFormat,
  ScryfallFormatName,
  ScryfallVersion,
  ScryfallVersionName,
} from '~/types/scryfall';

export class CardMapper {
  private static instance: CardMapper;

  static format(card: ScryCard): ScryfallCard {
    if (!this.instance) {
      this.instance = new this();
    }

    return {
      id: uuidv7(),
      externalId: card.id,
      imageUri: card.getImageURI('png'),
      name: this.instance.chooseBestName(card),
      manaCost: card.mana_cost ?? null,
      borderColor: card.border_color,
      cmc: card.cmc ?? null,
      collectionId: card.collector_number,
      effectText: card.oracle_text ?? null,
      flavorText: card.flavor_text ?? null,
      frame: card.frame,
      isFoundInBooster: card.booster,
      isReprint: card.reprint,
      isReserved: card.reserved,
      isStorySpotlight: card.story_spotlight,
      isVariant: card.variation,
      language: card.lang,
      layout: card.layout,
      loyalty: card.layout,
      rarity: card.rarity,
      securityStamp: card.security_stamp?.toString() ?? null,
      typeLine: this.instance.chooseBestTypeLine(card),
      setId: card.set_id,
      colors: this.instance.parseColors(card.colors),
      formats: this.instance.parseFormats(card.legalities),
      versions: this.instance.parseVersions(card.finishes, {
        oversized: card.oversized,
        promo: card.promo,
        textLess: card.textless,
      }),
      faces: this.instance.getCardFaces(card),
    };
  }

  private chooseBestName(card: ScryCard) {
    let { name } = card;

    const cardNameAsArray = card.name.split('//').map((name) => name.trim());

    if (
      cardNameAsArray.length === 2 &&
      cardNameAsArray[0] === cardNameAsArray[1]
    ) {
      const [cardName1] = cardNameAsArray;
      name = cardName1;
    }

    return name;
  }

  private chooseBestTypeLine(card: ScryCard) {
    let { type_line: typeLine } = card;

    if (typeLine) {
      const cardTypeLineAsArray = card.type_line
        ?.split('//')
        ?.map((type_line) => type_line.trim());
      if (
        cardTypeLineAsArray.length === 2 &&
        cardTypeLineAsArray[0] === cardTypeLineAsArray[1]
      ) {
        const [cardName1] = cardTypeLineAsArray;
        typeLine = cardName1;
      }

      return typeLine;
    }
    return null;
  }

  private parseColors(colors?: Color[] | null) {
    if (!colors) {
      return [];
    }

    return colors;
  }

  private parseFormats(legalities: Legalities) {
    const cardFormats = Object.keys(legalities);
    const formats: ScryfallFormat[] = [];

    cardFormats.forEach((format) => {
      formats.push({
        name: format as ScryfallFormatName,
        status: legalities[format],
      });
    });

    return formats;
  }

  private parseVersions(
    finishes: (keyof typeof ScryCardFinish)[],
    version: ScryfallVersion,
  ) {
    const finishedValues = Object.values(finishes);
    const apiVersionKeys = Object.keys(version);
    const versions: ScryfallVersionName[] = [];

    finishedValues.forEach((finish) => {
      if (!!ScryFallVersions[finish as ScryfallVersionName]) {
        versions.push(ScryFallVersions[finish]);
      }
    });

    apiVersionKeys.forEach((version) => {
      if (!!ScryFallVersions[version as ScryfallVersionName]) {
        versions.push(ScryFallVersions[version]);
      }
    });

    return versions;
  }

  private getCardFaces(card: ScryCard) {
    const faces: ScryfallFace[] = [];
    if (card.card_faces?.length) {
      card.card_faces.forEach((cardFace) => {
        if (card.name.toLowerCase() !== cardFace.name.toLowerCase()) {
          // get card face with different name of their "parent"
          const nameAsArray = card.name.split('//').map((name) => name.trim()); // multifaceted cards has '//' in their name to separate both sides
          if (
            nameAsArray.length === 2 &&
            nameAsArray[0].toLowerCase() !== nameAsArray[1].toLowerCase()
          ) {
            // Only process face if both card side has different names.
            faces.push({
              imageUri: cardFace.image_uris ? cardFace.image_uris.png : null,
              name: cardFace.name,
              manaCost: cardFace.mana_cost ?? null,
              effectText: cardFace.oracle_text ?? null,
              flavorText: cardFace.flavor_text ?? null,
              language: card.lang,
              typeLine: cardFace.type_line,
              setId: card.set_id,
              colors: this.parseColors(cardFace.colors),
              id: uuidv7(),
              externalId: card.id,
              cmc: cardFace.cmc ?? null,
            });
          }
        }
      });
    }
    return faces;
  }
}
