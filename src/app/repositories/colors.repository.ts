import { Color } from '../entities/color';

export abstract class ColorsRepository {
  abstract listAll(): Promise<Color[]>;
}
