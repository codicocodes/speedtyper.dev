import { Command, CommandRunner } from 'nest-commander';
import { SyncedProjectsService } from 'src/synced-projects/services/synced-projects';
import { FilesImporter } from '../services/files-importer';

@Command({
  name: 'import-files',
  arguments: '',
  options: {},
})
export class ImportFilesRunner extends CommandRunner {
  constructor(
    private synced: SyncedProjectsService,
    private importer: FilesImporter,
  ) {
    super();
  }
  async run(): Promise<void> {
    const projects = await this.synced.findAll();
    for (const project of projects) {
      await this.importer.import(project);
    }
  }
}
