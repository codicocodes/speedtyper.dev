import { connectToDB } from "../../db";
import { githubAPI } from "../../connectors/github/api";
import { RepositorySyncer } from "../../data/repositories/RepositorySyncer";
import { getAllTrackedRepos } from "../../data/tracked-repos/getAllTrackedRepos";

async function* syncAllTrackedRepos() {
  const syncer = new RepositorySyncer(githubAPI);
  const trackedRepos = await getAllTrackedRepos();
  for (const tracked of trackedRepos) {
    const repository = await syncer.sync(tracked);
    yield repository;
  }
}

async function runSyncTrackedRepos() {
  await connectToDB();
  for await (const repository of syncAllTrackedRepos()) {
    console.info(`[import] Synced ${repository.slug}.`);
  }
  process.exit(0);
}

runSyncTrackedRepos();
