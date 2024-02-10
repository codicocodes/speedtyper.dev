import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config({ path: __dirname + '/../../.env' });

export const pgOptions: Partial<PostgresConnectionOptions> = {
  url: process.env.DATABASE_PRIVATE_URL,
  extra: {
    // 120 seconds idle timeout
    idleTimeoutMillis: 120000,
    max: 10,
  },
};
