export abstract class SetsDataRepository {
  abstract create(setCode: string): Promise<void>;
  abstract listAllUnprocessed(): Promise<string[]>;
  abstract markAsProcessed(setCode: string): Promise<void>;
}
