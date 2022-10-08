import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunImportTrackedProjects } from './commands/run-import-tracked-projects';
import { ReadProjectsFromFile } from './services/read-projects-from-file';
import { TrackedProjectsService } from './services/tracked-projects';
import { TrackedProject } from './tracked-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackedProject])],
  providers: [
    TrackedProjectsService,
    RunImportTrackedProjects,
    ReadProjectsFromFile,
  ],
  exports: [TrackedProjectsService],
})
export class TrackedProjectsModule {}
