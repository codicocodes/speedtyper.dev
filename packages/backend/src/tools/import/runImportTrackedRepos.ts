import dotenv from "dotenv";
import path from "path";
import { connectToDB } from "../../db";
import { ReadSlugsFromFile } from "../../import/tracked-repos/ReadSlugsFromFile";
import { TrackedRepoImporter } from "../../import/tracked-repos/TrackedRepoImporter";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function* importTrackedRepos() {
  const reader = new ReadSlugsFromFile("./seed-data/repo-slugs.txt");
  const importer = new TrackedRepoImporter(reader);
  for await (const trackedRepo of importer.import()) {
    yield trackedRepo;
  }
}

async function runImportTrackedRepos(): Promise<void> {
  await connectToDB();
  for await (const trackedRepo of importTrackedRepos()) {
    console.info(`[import]: Confirmed tracking of: ${trackedRepo.slug}`);
  }
  process.exit(0);
}

runImportTrackedRepos();
