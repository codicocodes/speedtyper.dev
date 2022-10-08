import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackedProjectsModule } from './tracked-projects/tracked-projects.module';

const PostgresModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'speedtyper',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
});

@Module({
  imports: [PostgresModule, TrackedProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
