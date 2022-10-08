import { Command, CommandRunner } from 'nest-commander';
import { ReadProjectsFromFile } from '../services/read-projects-from-file';
import { TrackedProjectsService } from '../services/tracked-projects';

@Command({
  name: 'import-tracked-projects',
  arguments: '',
  options: {},
})
export class RunImportTrackedProjects extends CommandRunner {
  constructor(
    private reader: ReadProjectsFromFile,
    private service: TrackedProjectsService,
  ) {
    super();
  }
  async run(): Promise<void> {
    for await (const project of this.reader.readProjects()) {
      await this.service.bulkUpsert([project]);
    }
  }
}
