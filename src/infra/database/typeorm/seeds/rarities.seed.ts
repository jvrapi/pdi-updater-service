import { randomUUID } from 'crypto';
import { dataSource } from '../config/migration-config';

async function seedRaritiesTable() {
  const values = [
    {
      id: randomUUID(),
      name: 'common',
    },
    {
      id: randomUUID(),
      name: 'uncommon',
    },
    {
      id: randomUUID(),
      name: 'rare',
    },
    {
      id: randomUUID(),
      name: 'mythic',
    },
    {
      id: randomUUID(),
      name: 'special',
    },
  ];

  try {
    console.log('Seeding rarities table');
    await dataSource.initialize();
    await dataSource.manager
      .createQueryBuilder()
      .insert()
      .into('rarities', ['id', 'name'])
      .values(values)
      .execute();
    console.log('Rarities table seeded');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedRaritiesTable();
