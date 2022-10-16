import { ReadSlugsFromFile } from "../ReadSlugsFromFile";

describe("ReadReposFromFile", () => {
  it("yields the expected repo input", async () => {
    const reader = new ReadSlugsFromFile(
      "./src/import/tracked-repos/tests/read-slugs-from-file-test-data.txt"
    );
    const it = reader.readSlugs();
    const { value } = await it.next();
    expect(value).toBe("codicocodes/speedtyper.dev");
  });
  it("processes the production files without errors", async () => {
    const reader = new ReadSlugsFromFile("./seed-data/repo-slugs.txt");
    for await (const slug of reader.readSlugs()) {
      expect(slug).toContain("/");
    }
  });
});
