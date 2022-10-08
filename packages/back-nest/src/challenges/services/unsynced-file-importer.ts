import { Injectable } from '@nestjs/common';
import { GithubAPI } from 'src/connectors/github/services/github-api';
import { Project } from 'src/projects/entities/project.entity';
import { UnsyncedFile } from '../entities/unsynced-file.entity';
import { UnsyncedFileFilterer } from './unsynced-file-filterer';
import { UnsyncedFileService } from './unsynced-file.service';

@Injectable()
export class UnsyncedFileImporter {
  constructor(
    private api: GithubAPI,
    private filterer: UnsyncedFileFilterer,
    private svc: UnsyncedFileService,
  ) {}
  async import(project: Project) {
    const root = await this.api.fetchTree(
      project.fullName,
      project.defaultBranch,
    );
    const nodes = this.filterer.filter(root.tree);
    const files = nodes.map((node) =>
      UnsyncedFile.fromGithubNode(project, root.sha, node),
    );
    await this.svc.bulkUpsert(files);
    return root.sha;
  }
}
