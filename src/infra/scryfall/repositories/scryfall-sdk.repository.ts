import { Sets } from 'scryfall-sdk';
import { ScryfallRepository } from '~/app/repositories';
import { CardMapper, SetMapper } from '../mappers';
import { GetSetDetailsResponse } from '~/types/scryfall';

export class ScryfallSdkRepository implements ScryfallRepository {
  async getSetDetails(setCode: string): Promise<GetSetDetailsResponse> {
    const setDetails = await Sets.byCode(setCode);
    const setCards = await setDetails.getCards();
    const set = SetMapper.format(setDetails);

    const cards = setCards
      .map((card) => CardMapper.format(card))
      .map((card) => {
        card.faces.forEach((face) => {
          face.setId = set.id;
        });
        return {
          ...card,
          setId: set.id,
        };
      });

    return { ...set, cards };
  }
}
