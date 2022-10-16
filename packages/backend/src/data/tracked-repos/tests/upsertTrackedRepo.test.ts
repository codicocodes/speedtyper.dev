import { TrackedRepo } from "../model";
import { upsertTrackedRepo } from "../upsertTrackedRepo";

describe("upsertTrackedRepo", () => {
  const slug = "asdf/asdf";
  describe("when no repo exists", () => {
    it("create a new repo", async () => {
      await upsertTrackedRepo(slug);

      const allRepos = await TrackedRepo.find({});
      expect(allRepos.length).toBe(1);
    });

    it("returns a repo with the expected slug", async () => {
      const repo = await upsertTrackedRepo(slug);
      expect(repo.slug).toBe(slug);
      expect(repo._id).toBeDefined();
    });
  });

  describe("when a repo already exists", () => {
    beforeEach(async () => {
      const repo = await upsertTrackedRepo(slug);
      await repo.save();
    });

    it("does not create another repo", async () => {
      await upsertTrackedRepo(slug);
      const allRepos = await TrackedRepo.find({});
      expect(allRepos.length).toBe(1);
    });
  });
});
