import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

export const pgOptions = {
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT, 10),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};
