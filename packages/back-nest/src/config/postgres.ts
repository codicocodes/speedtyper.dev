import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config({ path: __dirname + '/../../.env' });

const url = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const pgOptions: Partial<PostgresConnectionOptions> = {
  url,
  extra: {
    // 120 seconds idle timeout
    idleTimeoutMillis: 120000,
    max: 10,
  },
};
