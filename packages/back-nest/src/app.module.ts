import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrackedProjectsModule } from './tracked-projects/tracked-projects.module';
import { SyncedProjectsModule } from './synced-projects/synced-projects.module';
import { GithubConnectorModule } from './connectors/github/github.module';
import { FilesModule } from './files/files.module';

const PostgresModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'speedtyper',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: true,
});

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresModule,
    TrackedProjectsModule,
    SyncedProjectsModule,
    GithubConnectorModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
