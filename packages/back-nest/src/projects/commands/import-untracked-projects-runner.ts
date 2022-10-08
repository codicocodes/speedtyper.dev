import { Command, CommandRunner } from 'nest-commander';
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
    private service: UntrackedProjectService,
  ) {
    super();
  }
  async run(): Promise<void> {
    for await (const project of this.reader.readProjects()) {
      await this.service.bulkUpsert([project]);
    }
  }
}
