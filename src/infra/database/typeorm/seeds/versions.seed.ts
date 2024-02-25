import { randomUUID } from 'crypto';
import { dataSource } from '../config/migration-config';

async function seedVersionsTable() {
  const values = [
    {
      id: randomUUID(),
      name: 'oversized',
    },
    {
      id: randomUUID(),
      name: 'foil',
    },
    {
      id: randomUUID(),
      name: 'nonFoil',
    },
    {
      id: randomUUID(),
      name: 'promo',
    },
    {
      id: randomUUID(),
      name: 'textLess',
    },
  ];

  try {
    console.log('Seeding versions table');
    await dataSource.initialize();
    await dataSource.manager
      .createQueryBuilder()
      .insert()
      .into('versions', ['id', 'name'])
      .values(values)
      .execute();
    console.log('Versions table seeded');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedVersionsTable();
