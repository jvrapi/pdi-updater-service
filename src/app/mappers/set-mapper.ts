import { Set } from 'scryfall-sdk';
import { uuidv7 } from 'uuidv7';

export class SetMapper {
  static format(set: Set) {
    return {
      id: uuidv7(),
      externalId: set.id,
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
