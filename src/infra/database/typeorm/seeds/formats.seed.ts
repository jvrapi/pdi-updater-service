import { randomUUID } from 'crypto';
import { dataSource } from '../config/migration-config';

async function seedFormatsTable() {
  const values = [
    {
      id: randomUUID(),
      name: 'standard',
    },
    {
      id: randomUUID(),
      name: 'future',
    },
    {
      id: randomUUID(),
      name: 'historic',
    },
    {
      id: randomUUID(),
      name: 'timeless',
    },
    {
      id: randomUUID(),
      name: 'gladiator',
    },
    {
      id: randomUUID(),
      name: 'pioneer',
    },
    {
      id: randomUUID(),
      name: 'explorer',
    },
    {
      id: randomUUID(),
      name: 'modern',
    },
    {
      id: randomUUID(),
      name: 'legacy',
    },
    {
      id: randomUUID(),
      name: 'pauper',
    },
    {
      id: randomUUID(),
      name: 'vintage',
    },
    {
      id: randomUUID(),
      name: 'penny',
    },
    {
      id: randomUUID(),
      name: 'commander',
    },
    {
      id: randomUUID(),
      name: 'oathbreaker',
    },
    {
      id: randomUUID(),
      name: 'standardbrawl',
    },
    {
      id: randomUUID(),
      name: 'brawl',
    },
    {
      id: randomUUID(),
      name: 'alchemy',
    },
    {
      id: randomUUID(),
      name: 'paupercommander',
    },
    {
      id: randomUUID(),
      name: 'duel',
    },
    {
      id: randomUUID(),
      name: 'oldschool',
    },
    {
      id: randomUUID(),
      name: 'premodern',
    },
    {
      id: randomUUID(),
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
