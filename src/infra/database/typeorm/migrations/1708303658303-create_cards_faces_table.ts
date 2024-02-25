import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardsFacesTable1708303658303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards_faces',
        columns: [
          {
            name: 'card_id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'face_id',
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
            columnNames: ['face_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cards',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards_faces', true, true, true);
  }
}
