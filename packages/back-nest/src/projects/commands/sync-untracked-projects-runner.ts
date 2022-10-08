import { Command, CommandRunner } from 'nest-commander';
import { GithubAPI } from 'src/connectors/github/services/github-api';
import { Project } from '../entities/project.entity';
import { ProjectService } from '../services/project.service';
import { UntrackedProjectService } from '../services/untracked-projects.service';

@Command({
  name: 'sync-projects',
  arguments: '',
  options: {},
})
export class SyncUntrackedProjectsRunner extends CommandRunner {
  constructor(
    private untracked: UntrackedProjectService,
    private api: GithubAPI,
    private synced: ProjectService,
  ) {
    super();
  }
  async run(): Promise<void> {
    const trackedProjects = await this.untracked.findAll();
    for (const trackedProject of trackedProjects) {
      const repository = await this.api.fetchRepository(
        trackedProject.fullName,
      );
      const project = Project.fromGithubRepository(trackedProject, repository);
      await this.synced.bulkUpsert([project]);
    }
  }
}
