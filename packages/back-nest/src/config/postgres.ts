import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

export const pgOptions = {
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
};
