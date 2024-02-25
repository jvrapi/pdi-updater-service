import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardsRaritiesTable1708298400533
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards_rarities',
        columns: [
          {
            name: 'card_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'rarity_id',
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
            columnNames: ['rarity_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rarities',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards_rarities', true, true, true);
  }
}
