import { upsertTrackedRepo } from "../../data/tracked-repos/upsertTrackedRepo";

export interface TrackedRepoSlugsReader {
  readSlugs(): AsyncGenerator<string, void, unknown>;
}

export class TrackedRepoImporter {
  constructor(private reader: TrackedRepoSlugsReader) {}
  async *import() {
    for await (const slug of this.reader.readSlugs()) {
      const trackedRepo = await upsertTrackedRepo(slug);
      yield trackedRepo;
    }
  }
}
