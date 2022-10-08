import { Command, CommandRunner } from 'nest-commander';
import { ProjectService } from 'src/projects/services/project.service';
import { FilesImporter } from '../services/files-importer';

@Command({
  name: 'import-files',
  arguments: '',
  options: {},
})
export class ImportFilesRunner extends CommandRunner {
  constructor(
    private projectService: ProjectService,
    private importer: FilesImporter,
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
