import { Format } from '../entities/format';

export abstract class FormatsRepository {
  abstract listAll(): Promise<Format[]>;
}
