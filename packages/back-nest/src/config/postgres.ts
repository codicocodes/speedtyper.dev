import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config({ path: __dirname + '/../../.env' });

export const pgOptions: Partial<PostgresConnectionOptions> = {
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT, 10),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  extra: {
    // 120 seconds idle timeout
    idleTimeoutMillis: 120000,
    max: 10,
  },
};
