import { Module } from '@nestjs/common';
import { ChallengesModule } from 'src/challenges/challenges.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { ProjectSeedRunner } from './commands/challenge.seeder';

@Module({
  imports: [ProjectsModule, ChallengesModule],
  providers: [ProjectSeedRunner],
})
export class SeederModule {}
