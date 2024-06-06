import { uuidv7 } from 'uuidv7';
import { dataSource } from '../config/migration-config';

async function seedFormatsTable() {
  const values = [
    {
      id: uuidv7(),
      name: 'standard',
    },
    {
      id: uuidv7(),
      name: 'future',
    },
    {
      id: uuidv7(),
      name: 'historic',
    },
    {
      id: uuidv7(),
      name: 'timeless',
    },
    {
      id: uuidv7(),
      name: 'gladiator',
    },
    {
      id: uuidv7(),
      name: 'pioneer',
    },
    {
      id: uuidv7(),
      name: 'explorer',
    },
    {
      id: uuidv7(),
      name: 'modern',
    },
    {
      id: uuidv7(),
      name: 'legacy',
    },
    {
      id: uuidv7(),
      name: 'pauper',
    },
    {
      id: uuidv7(),
      name: 'vintage',
    },
    {
      id: uuidv7(),
      name: 'penny',
    },
    {
      id: uuidv7(),
      name: 'commander',
    },
    {
      id: uuidv7(),
      name: 'oathbreaker',
    },
    {
      id: uuidv7(),
      name: 'standardbrawl',
    },
    {
      id: uuidv7(),
      name: 'brawl',
    },
    {
      id: uuidv7(),
      name: 'alchemy',
    },
    {
      id: uuidv7(),
      name: 'paupercommander',
    },
    {
      id: uuidv7(),
      name: 'duel',
    },
    {
      id: uuidv7(),
      name: 'oldschool',
    },
    {
      id: uuidv7(),
      name: 'premodern',
    },
    {
      id: uuidv7(),
      name: 'predh',
    },
  ];

  try {
    console.log('Seeding formats table');
    await dataSource.initialize();
    await dataSource.manager
      .createQueryBuilder()
      .insert()
      .into('formats', ['id', 'name'])
      .values(values)
      .execute();
    console.log('Formats table seeded');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedFormatsTable();
