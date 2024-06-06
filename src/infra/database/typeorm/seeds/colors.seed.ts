import { uuidv7 } from 'uuidv7';
import { dataSource } from '../config/migration-config';

async function seedColorsTable() {
  try {
    console.log('Seeding colors table');
    await dataSource.initialize();
    await dataSource.manager
      .createQueryBuilder()
      .insert()
      .into('colors', ['id', 'name', 'color'])
      .values([
        { id: uuidv7(), name: 'White', color: 'W' },
        { id: uuidv7(), name: 'Blue', color: 'U' },
        { id: uuidv7(), name: 'Black', color: 'B' },
        { id: uuidv7(), name: 'Red', color: 'R' },
        { id: uuidv7(), name: 'Green', color: 'G' },
      ])
      .execute();
    console.log('Colors table seeded');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedColorsTable();
