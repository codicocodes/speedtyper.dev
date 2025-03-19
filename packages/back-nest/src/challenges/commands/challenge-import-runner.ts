import { Command, CommandRunner } from 'nest-commander';
import { GithubAPI } from 'src/connectors/github/services/github-api';
import { Challenge } from '../entities/challenge.entity';
import { UnsyncedFile } from '../entities/unsynced-file.entity';
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
    let filesSynced = 0;
    const files = await this.unsynced.findAllWithProject();
    for (const file of files) {
      const challenges = await this.syncChallengesFromFile(file);
      filesSynced++;
      console.info(
        `[challenge-import]: ${filesSynced}/${files.length} synced. Challenges added=${challenges.length}`,
      );
    }
  }

  private async syncChallengesFromFile(file: UnsyncedFile) {
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
    return challenges;
  }

  private parseNodesFromContent(path: string, base64Content: string) {
    const fileExtension = path.split('.').pop();
    const parser = this.parserService.getParser(fileExtension);
    const content = Buffer.from(base64Content, 'base64').toString();
    const nodes = parser.parseCode(content);
    return nodes;
  }
}
