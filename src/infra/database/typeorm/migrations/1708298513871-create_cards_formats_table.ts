import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardsFormatsTable1708298513871
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards_formats',
        columns: [
          {
            name: 'card_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'format_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['card_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cards',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['format_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'formats',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards_formats', true, true, true);
  }
}
