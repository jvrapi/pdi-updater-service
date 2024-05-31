import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateExternalIdInTables1716922827050
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sets',
      new TableColumn({
        name: 'external_id',
        type: 'varchar(36)',
      }),
    );

    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'external_id',
        type: 'varchar(36)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sets', 'external_id');
    await queryRunner.dropColumn('cards', 'external_id');
  }
}
