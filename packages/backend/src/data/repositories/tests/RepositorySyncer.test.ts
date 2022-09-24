import { ITrackedRepoDoc } from "../../tracked-repos/model";
import { upsertTrackedRepo } from "../../tracked-repos/upsertTrackedRepo";
import repoInfo from "../../../connectors/github/tests/mock-responses/repository";
import { Repository } from "../model";
import { RepositorySyncer } from "../RepositorySyncer";

class MockRepoInfoFetcher {
  async fetchRepository(_: string) {
    return repoInfo;
  }
}

const expectedInfo = {
  slug: "slug/slug",
  htmlUrl: repoInfo.html_url,
  stars: repoInfo.stargazers_count,
  licenseName: repoInfo.license.name,
  ownerAvatar: repoInfo.owner.avatar_url,
  language: repoInfo.language,
  defaultBranch: repoInfo.default_branch,
};

describe("RepoInfoSyncer", () => {
  const fetcher = new MockRepoInfoFetcher();
  const syncer = new RepositorySyncer(fetcher);
  let repo: ITrackedRepoDoc;
  beforeEach(async () => {
    repo = await upsertTrackedRepo(expectedInfo.slug);
  });

  describe("when the repo does not have saved info", () => {
    it("saves the info", async () => {
      const repository = await syncer.sync(repo);
      expect(repository.toJSON()).toEqual(
        expect.objectContaining(expectedInfo)
      );
      expect(repository._id).toBeDefined();
    });

    describe("when there is saved info", () => {
      beforeEach(async () => {
        repo = await Repository.create({
          slug: repo.slug,
          htmlUrl: "another url",
          stars: 42,
          licenseName: "a license",
          ownerAvatar: "another avatar url",
          language: "Hack",
          defaultBranch: "another one",
        });
        await repo.save();
      });
      it("updates the info", async () => {
        const updatedRepo = await syncer.sync(repo);
        expect(updatedRepo.toObject()).toEqual(
          expect.objectContaining(expectedInfo)
        );
        expect(updatedRepo._id).toEqual(repo._id);
      });
    });
  });
});
