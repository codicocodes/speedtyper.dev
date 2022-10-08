import { Injectable } from '@nestjs/common';
import { GithubAPI } from 'src/connectors/github/services/github-api';
import { SyncedProject } from 'src/synced-projects/synced-project.entity';
import { File } from '../file.entity';
import { FilesService } from './files';
import { FilesFilterer } from './files-filterer';

@Injectable()
export class FilesImporter {
  constructor(
    private api: GithubAPI,
    private filterer: FilesFilterer,
    private svc: FilesService,
  ) {}
  async import(project: SyncedProject) {
    const root = await this.api.fetchTree(
      project.fullName,
      project.defaultBranch,
    );
    const nodes = this.filterer.filter(root.tree);
    console.log(nodes.length);
    const files = nodes.map((node) =>
      File.fromGithubNode(project, root.sha, node),
    );
    await this.svc.bulkUpsert(files);
  }
}
