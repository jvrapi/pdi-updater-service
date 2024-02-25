import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardsColorsTable1708298577037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards_colors',
        columns: [
          {
            name: 'card_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'color_id',
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
            columnNames: ['color_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'colors',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards_colors', true, true, true);
  }
}
