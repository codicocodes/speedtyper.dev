import dotenv from "dotenv";
import path from "path";
import { connectToDB } from "../../db";
import { githubAPI } from "../../connectors/github/api";
import { TrackedFilesImporter } from "../../import/tracked-files/TrackedFilesImporter";
import { getAllRepositories } from "../../data/repositories/getAllRepositories";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function importTrackedFiles() {
  const importer = new TrackedFilesImporter(githubAPI);
  const repositories = await getAllRepositories();
  for (const repo of repositories) {
    await importer.import(repo);
  }
}

async function runChallengeImporter(): Promise<void> {
  await connectToDB();
  await importTrackedFiles();
  process.exit(0);
}

runChallengeImporter();
