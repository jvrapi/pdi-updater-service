import { uuidv7 } from 'uuidv7';
import { dataSource } from '../config/migration-config';

async function seedRaritiesTable() {
  const values = [
    {
      id: uuidv7(),
      name: 'common',
    },
    {
      id: uuidv7(),
      name: 'uncommon',
    },
    {
      id: uuidv7(),
      name: 'rare',
    },
    {
      id: uuidv7(),
      name: 'mythic',
    },
    {
      id: uuidv7(),
      name: 'special',
    },
    {
      id: uuidv7(),
      name: 'bonus',
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
