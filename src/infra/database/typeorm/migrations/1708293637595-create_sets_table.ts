import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSetsTable1708293637595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sets',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'icon_uri',
            type: 'varchar',
          },
          {
            name: 'released_at',
            type: 'date',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'is_digital',
            type: 'boolean',
          },
          {
            name: 'is_foil_only',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sets', true, true, true);
  }
}
