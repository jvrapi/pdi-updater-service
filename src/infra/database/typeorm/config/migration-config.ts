import 'dotenv/config';
import { randomBytes } from 'node:crypto';
import { DataSource, DataSourceOptions } from 'typeorm';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const { NODE_ENV, DATABASE_URL } = process.env;

const getDatabaseTestName = () => `test_${randomBytes(6).toString('hex')}`;

const sqliteConfig: BetterSqlite3ConnectionOptions = {
  type: 'better-sqlite3',
  database: `./test/databases/${getDatabaseTestName()}.sqlite`,
};

const mysqlConfig: MysqlConnectionOptions = {
  type: 'mysql',
  url: DATABASE_URL,
};

const configToUse =
  NODE_ENV?.toLowerCase() === 'test' ? sqliteConfig : mysqlConfig;

export const dataSourceOptions: DataSourceOptions = {
  ...configToUse,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
};

export default dataSourceOptions;
export const dataSource = new DataSource(dataSourceOptions);
