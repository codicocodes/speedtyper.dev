import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GithubConnectorModule } from './connectors/github/github.module';
import { ProjectsModule } from './projects/projects.module';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';

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
    ChallengesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
