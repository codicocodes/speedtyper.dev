import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { pgOptions } from './config/postgres';

const entities = [__dirname + '/**/*.entity.{ts,js}'];

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  synchronize: true,
  entities,
  ...pgOptions,
});

export const PostgresModule = TypeOrmModule.forRootAsync({
  useFactory: () => {
    return {
      type: 'postgres',
      synchronize: true,
      entities,
      ...pgOptions,
    };
  },
  dataSourceFactory: async () => {
    return PostgresDataSource.initialize();
  },
});
