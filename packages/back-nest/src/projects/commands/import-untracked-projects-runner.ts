import { Command, CommandRunner } from 'nest-commander';
import { ProjectService } from '../services/project.service';
import { ProjectsFromFileReader } from '../services/projects-from-file-reader';
import { UntrackedProjectService } from '../services/untracked-projects.service';

@Command({
  name: 'import-projects',
  arguments: '',
  options: {},
})
export class ImportUntrackedProjectsRunner extends CommandRunner {
  constructor(
    private reader: ProjectsFromFileReader,
    private untracked: UntrackedProjectService,
    private synced: ProjectService,
  ) {
    super();
  }
  async run(): Promise<void> {
    for await (const project of this.reader.readProjects()) {
      const syncedProject = await this.synced.findByFullName(project);
      if (!syncedProject) {
        await this.untracked.bulkUpsert([project]);
      }
    }
  }
}
