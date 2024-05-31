import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { validateEnv } from '~/config';

const env = validateEnv();

const getDatabaseUrl = (): string => {
  const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = env;
  return `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  url: getDatabaseUrl(),
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
};

export default dataSourceOptions;
export const dataSource = new DataSource(dataSourceOptions);
