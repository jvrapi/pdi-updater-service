import { dataSource } from '../config/migration-config';
import { randomUUID } from 'crypto';

async function seedColorsTable() {
  try {
    console.log('Seeding colors table');
    await dataSource.initialize();
    await dataSource.manager
      .createQueryBuilder()
      .insert()
      .into('colors', ['id', 'name', 'color'])
      .values([
        { id: randomUUID(), name: 'White', color: 'W' },
        { id: randomUUID(), name: 'Blue', color: 'U' },
        { id: randomUUID(), name: 'Black', color: 'B' },
        { id: randomUUID(), name: 'Red', color: 'R' },
        { id: randomUUID(), name: 'Green', color: 'G' },
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
