import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class MakeFieldsNullableInCardsTable1708324101575
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('cards', [
      {
        oldColumn: new TableColumn({
          name: 'flavor_text',
          type: 'longtext',
        }),
        newColumn: new TableColumn({
          name: 'flavor_text',
          type: 'longtext',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'security_stamp',
          type: 'longtext',
        }),
        newColumn: new TableColumn({
          name: 'security_stamp',
          type: 'longtext',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'border_color',
          type: 'longtext',
        }),
        newColumn: new TableColumn({
          name: 'border_color',
          type: 'longtext',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'effect_text',
          type: 'longtext',
        }),
        newColumn: new TableColumn({
          name: 'effect_text',
          type: 'longtext',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'mana_cost',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'mana_cost',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'type_line',
          type: 'varchar',
        }),
        newColumn: new TableColumn({
          name: 'type_line',
          type: 'varchar',
          isNullable: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('cards', [
      {
        oldColumn: new TableColumn({
          name: 'flavor_text',
          type: 'longtext',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'flavor_text',
          type: 'longtext',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'security_stamp',
          type: 'longtext',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'security_stamp',
          type: 'longtext',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'border_color',
          type: 'longtext',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'border_color',
          type: 'longtext',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'effect_text',
          type: 'longtext',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'effect_text',
          type: 'longtext',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'mana_cost',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'mana_cost',
          type: 'varchar',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'type_line',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'type_line',
          type: 'varchar',
        }),
      },
    ]);
  }
}
