import { Command, CommandRunner } from 'nest-commander';
import { ProjectService } from 'src/projects/services/project.service';
import { UnsyncedFileImporter } from '../services/unsynced-file-importer';

@Command({
  name: 'import-files',
  arguments: '',
  options: {},
})
export class UnsyncedFileImportRunner extends CommandRunner {
  constructor(
    private projectService: ProjectService,
    private importer: UnsyncedFileImporter,
  ) {
    super();
  }
  async run(): Promise<void> {
    const projects = await this.projectService.findAll();
    for (const project of projects) {
      await this.importer.import(project);
    }
  }
}
