import { GetSetDetailsResponse } from '~/types/scryfall';

export abstract class ScryfallRepository {
  abstract getSetDetails(setCode: string): Promise<GetSetDetailsResponse>;
}
