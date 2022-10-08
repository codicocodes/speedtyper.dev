import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubConnectorModule } from 'src/connectors/github/github.module';
import { TrackedProjectsModule } from 'src/tracked-projects/tracked-projects.module';
import { RunSyncTrackedProjects } from './commands/run-sync-tracked-projects';
import { SyncedProjectsService } from './services/synced-projects';
import { SyncedProject } from './synced-project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SyncedProject]),
    TrackedProjectsModule,
    GithubConnectorModule,
  ],
  providers: [SyncedProjectsService, RunSyncTrackedProjects],
  exports: [SyncedProjectsService],
})
export class SyncedProjectsModule {}
