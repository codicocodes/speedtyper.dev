import { IRepositoryDoc } from "../../data/repositories/model";
import { GithubNode, GithubTree } from "../../connectors/github/schema/tree";
import { bulkUpsertTrackedFiles } from "../../data/tracked-files/bulkUpsertTrackedFiles";

export interface IDataFetcher {
  fetchGitTree(slug: string, sha: string): Promise<GithubTree>;
}

export class TrackedFilesImporter {
  constructor(private fetcher: IDataFetcher) {}
  async import(repo: IRepositoryDoc) {
    const root = await this.fetcher.fetchGitTree(repo.slug, repo.defaultBranch);
    const trackedNodes = filterTrackedNodes(root);
    await bulkUpsertTrackedFiles(repo._id, root.sha, trackedNodes);
    console.info(
      `[import] Synced ${trackedNodes.length} tracked files for ${repo.slug}`
    );
  }
}

function isBlobNode(node: GithubNode) {
  return node.type === "blob";
}

function hasTrackedFileExt(node: GithubNode) {
  const trackedFileExtensions = [".go"];
  for (const includedExt of trackedFileExtensions) {
    if (node.path.endsWith(includedExt)) {
      // ends with tracked file extension
      return true;
    }
  }
  // untracked file extension
  return false;
}

function isNotExcludedPath(node: GithubNode) {
  const excludedSubStrings = ["types", "test", ".pb.", ".proto", "doc"];
  for (const excludeStr of excludedSubStrings) {
    if (node.path.includes(excludeStr)) {
      // is excluded path
      return false;
    }
  }
  // is not excluded path
  return true;
}

function filterTrackedNodes(root: GithubTree) {
  return root.tree
    .filter(isBlobNode)
    .filter(hasTrackedFileExt)
    .filter(isNotExcludedPath);
}
