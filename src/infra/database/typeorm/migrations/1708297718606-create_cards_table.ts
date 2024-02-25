import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardsTable1708297112151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'set_id',
            type: 'varchar(36)',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'language',
            type: 'varchar',
          },
          {
            name: 'layout',
            type: 'varchar',
          },
          {
            name: 'mana_cost',
            type: 'varchar',
          },
          {
            name: 'cmc',
            type: 'decimal',
          },
          {
            name: 'type_line',
            type: 'varchar',
          },
          {
            name: 'loyalty',
            type: 'varchar',
          },
          {
            name: 'image_uri',
            type: 'varchar',
          },
          {
            name: 'collection_id',
            type: 'varchar',
          },
          {
            name: 'security_stamp',
            type: 'longtext',
          },
          {
            name: 'border_color',
            type: 'longtext',
          },
          {
            name: 'effect_text',
            type: 'longtext',
          },
          {
            name: 'flavor_text',
            type: 'longtext',
          },
          {
            name: 'frame',
            type: 'varchar',
          },
          {
            name: 'is_reserved',
            type: 'boolean',
          },
          {
            name: 'is_reprint',
            type: 'boolean',
          },
          {
            name: 'is_variant',
            type: 'boolean',
          },
          {
            name: 'is_found_in_booster',
            type: 'boolean',
          },
          {
            name: 'is_story_spotlight',
            type: 'boolean',
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
            columnNames: ['set_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sets',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards', true, true, true);
  }
}
