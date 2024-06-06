import { dataSource } from '../config/migration-config';
import { uuidv7 } from 'uuidv7';

async function seedVersionsTable() {
  const values = [
    {
      id: uuidv7(),
      name: 'oversized',
    },
    {
      id: uuidv7(),
      name: 'foil',
    },
    {
      id: uuidv7(),
      name: 'nonFoil',
    },
    {
      id: uuidv7(),
      name: 'promo',
    },
    {
      id: uuidv7(),
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
