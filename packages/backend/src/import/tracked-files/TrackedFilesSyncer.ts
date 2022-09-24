// import { CodeChallenge } from "data/code-challenges/model";
import { ChallengeParser } from "../../parser/ChallengeParsers";
import { GithubBlob } from "../../connectors/github/schema/blob";
import { IRepositoryDoc } from "../../data/repositories/model";
import { TrackedFile } from "../../data/tracked-files/model";
import { bulkUpsertCodeChallenges } from "../../data/code-challenges/bulkUpsertCodeChallenges";

export interface BlobDataFetcher {
  fetchBlob(fullName: string, sha: string): Promise<GithubBlob>;
}

export class TrackedFilesSyncer {
  constructor(private fetcher: BlobDataFetcher) {}
  async sync(repository: IRepositoryDoc, parser: ChallengeParser) {
    const cursor = TrackedFile.find({
      repositoryId: repository._id,
    }).cursor();
    for await (const file of cursor) {
      if (file.syncedSha !== file.currentSha) {
        const blob = await this.fetcher.fetchBlob(
          repository.slug,
          file.currentSha
        );
        const content = Buffer.from(blob.content, blob.encoding).toString();

        const nodes = parser.parseTrackedNodes(content);

        const snippets = nodes.map((node) => {
          const permaUrl = getGithubPermaURL(
            repository.slug,
            file.currentTreeSha,
            file.path,
            node.startPosition.row
          );
          return {
            content: node.text,
            permaUrl,
          };
        });
        await bulkUpsertCodeChallenges(
          repository._id,
          file.currentTreeSha,
          blob.sha,
          file.path,
          snippets
        );
      }
    }
  }
}

function getGithubPermaURL(
  fullName: string,
  sha: string,
  filePath: string,
  row: number
) {
  // NOTE: row is 0 indexed, while #L is 1 indexed
  return `https://github.com/${fullName}/blob/${sha}/${filePath}#L${row + 1}`;
}
