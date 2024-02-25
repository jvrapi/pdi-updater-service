import { Version } from '../entities/version';

export abstract class VersionsRepository {
  abstract listAll(): Promise<Version[]>;
}
