import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GithubConnectorModule } from './connectors/github/github.module';
import { FilesModule } from './files/files.module';
import { ProjectsModule } from './projects/projects.module';

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
    ProjectsModule,
    GithubConnectorModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
