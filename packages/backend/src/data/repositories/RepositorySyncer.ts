import { GithubRepository } from "connectors/github/schema/repository";
import { ITrackedRepoDoc } from "data/tracked-repos/model";
import { upsertRepository } from "./upsertRepository";

export interface RepoDataFetcher {
  fetchRepository(repoName: string): Promise<GithubRepository>;
}

export class RepositorySyncer {
  constructor(private fetcher: RepoDataFetcher) {}
  async sync(trackedRepo: ITrackedRepoDoc) {
    const githubData = await this.fetcher.fetchRepository(trackedRepo.slug);
    const repository = await upsertRepository(trackedRepo.slug, githubData);
    return repository;
  }
}
