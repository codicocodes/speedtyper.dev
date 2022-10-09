import { Command, CommandRunner } from 'nest-commander';
import { GithubAPI } from 'src/connectors/github/services/github-api';
import { Challenge } from '../entities/challenge.entity';
import { ChallengeService } from '../services/challenge.service';
import { ParserService } from '../services/parser.service';
import { UnsyncedFileService } from '../services/unsynced-file.service';

@Command({
  name: 'import-challenges',
  arguments: '',
  options: {},
})
export class ChallengeImportRunner extends CommandRunner {
  constructor(
    private api: GithubAPI,
    private unsynced: UnsyncedFileService,
    private parserService: ParserService,
    private challengeService: ChallengeService,
  ) {
    super();
  }
  async run(): Promise<void> {
    const files = await this.unsynced.findAllWithProject();
    let filesSynced = 0;
    for (const file of files) {
      const blob = await this.api.fetchBlob(
        file.project.fullName,
        file.currentSha,
      );
      const nodes = this.parseNodesFromContent(file.path, blob.content);
      const challenges = nodes.map((node) =>
        Challenge.fromTSNode(file.project, file, node),
      );
      await this.challengeService.upsert(challenges);
      await this.unsynced.remove([file]);
      filesSynced++;
      console.info(
        `[challenge-import]: ${filesSynced}/${files.length} synced. Challenges added=${challenges.length}`,
      );
    }
  }

  private parseNodesFromContent(path: string, base64Content: string) {
    const fileExtension = path.split('.').pop();
    const parser = this.parserService.getParser(fileExtension);
    const content = Buffer.from(base64Content, 'base64').toString();
    const nodes = parser.parseTrackedNodes(content);
    return nodes;
  }
}
