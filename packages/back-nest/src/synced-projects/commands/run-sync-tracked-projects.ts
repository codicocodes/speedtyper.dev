import { Command, CommandRunner } from 'nest-commander';
import { GithubAPI } from 'src/connectors/github/services/github-api';
import { TrackedProjectsService } from 'src/tracked-projects/services/tracked-projects';
import { SyncedProjectsService } from '../services/synced-projects';
import { SyncedProject } from '../synced-project.entity';

@Command({
  name: 'sync-projects',
  arguments: '',
  options: {},
})
export class RunSyncTrackedProjects extends CommandRunner {
  constructor(
    private tracked: TrackedProjectsService,
    private api: GithubAPI,
    private synced: SyncedProjectsService,
  ) {
    super();
  }
  async run(): Promise<void> {
    const trackedProjects = await this.tracked.findAll();
    for (const trackedProject of trackedProjects) {
      const repository = await this.api.fetchRepository(trackedProject.fullName)
      const project = SyncedProject.fromGithubRepository(trackedProject, repository)
      await this.synced.bulkUpsert([project])
    }
  }
}
