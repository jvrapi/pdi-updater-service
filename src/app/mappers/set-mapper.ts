import { Set } from 'scryfall-sdk';

export class SetMapper {
  static toCardsService(set: Set) {
    return {
      id: set.id,
      name: set.name,
      code: set.code,
      isDigital: set.digital,
      isFoilOnly: set.foil_only,
      releasedAt: set.released_at,
      type: set.set_type,
      iconUri: set.icon_svg_uri,
    };
  }
}
