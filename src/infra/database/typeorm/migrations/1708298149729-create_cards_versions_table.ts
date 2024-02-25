import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardsVersionsTable1708298149729
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards_versions',
        columns: [
          {
            name: 'card_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'version_id',
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
            columnNames: ['version_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'versions',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards_versions', true, true, true);
  }
}
