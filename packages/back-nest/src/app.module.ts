import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubConnectorModule } from './connectors/github/github.module';
import { ProjectsModule } from './projects/projects.module';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';
import { PostgresModule } from './database.module';
import { RacesModule } from './races/races.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresModule,
    ProjectsModule,
    GithubConnectorModule,
    ChallengesModule,
    UsersModule,
    RacesModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
