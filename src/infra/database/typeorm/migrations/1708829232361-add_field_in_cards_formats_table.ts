import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldInCardsFormatsTable1708829232361
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cards_formats',
      new TableColumn({
        name: 'status',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cards_formats', 'status');
  }
}
