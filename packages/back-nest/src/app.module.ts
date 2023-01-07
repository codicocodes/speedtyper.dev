import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GithubConnectorModule } from './connectors/github/github.module';
import { ProjectsModule } from './projects/projects.module';
import { ChallengesModule } from './challenges/challenges.module';
import { UsersModule } from './users/users.module';
import { PostgresModule } from './database.module';
import { RacesModule } from './races/races.module';
import { SeederModule } from './seeder/seeder.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ChallengesModule,
    ConfigModule.forRoot(),
    GithubConnectorModule,
    PostgresModule,
    ProjectsModule,
    RacesModule,
    SeederModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
