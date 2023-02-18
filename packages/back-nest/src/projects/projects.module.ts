import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubConnectorModule } from 'src/connectors/github/github.module';
import { ImportUntrackedProjectsRunner } from './commands/import-untracked-projects-runner';
import { SyncUntrackedProjectsRunner } from './commands/sync-untracked-projects-runner';
import { Project } from './entities/project.entity';
import { UntrackedProject } from './entities/untracked-project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './services/project.service';
import { ProjectsFromFileReader } from './services/projects-from-file-reader';
import { UntrackedProjectService } from './services/untracked-projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, UntrackedProject]),
    GithubConnectorModule,
  ],
  providers: [
    UntrackedProjectService,
    ProjectService,
    ProjectsFromFileReader,
    ImportUntrackedProjectsRunner,
    SyncUntrackedProjectsRunner,
  ],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectsModule {}
