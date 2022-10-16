import { TrackedRepoImporter } from "../TrackedRepoImporter";

const slug = "slug/slug";

class MockTrackedSlugsReader {
  async *readSlugs() {
    yield slug;
  }
}

describe("TrackedRepoImporter.import", () => {
  const reader = new MockTrackedSlugsReader();
  const importer = new TrackedRepoImporter(reader);
  describe("when a tracked repo does not exist", () => {
    it("yields a tracked repo with the slug", async () => {
      const it = importer.import();
      const { value } = await it.next();
      expect(value?.toObject()?.slug).toEqual(slug);
      expect(value?.toObject()?._id).toBeDefined();
    });
  });
});
