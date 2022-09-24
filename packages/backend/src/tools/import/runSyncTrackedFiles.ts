import { connectToDB } from "../../db";
import { githubAPI } from "../../connectors/github/api";
import { getAllRepositories } from "../../data/repositories/getAllRepositories";
import { TrackedFilesSyncer } from "../../import/tracked-files/TrackedFilesSyncer";
import { ChallengeParser } from "../../parser/ChallengeParsers";
import { getTSParserByLanguage } from "../../parser/getTSParserByLanguage";

async function syncTrackedFiles() {
  const syncer = new TrackedFilesSyncer(githubAPI);
  const parser = new ChallengeParser(getTSParserByLanguage("go"));
  const repositories = await getAllRepositories();
  for (const repo of repositories) {
    await syncer.sync(repo, parser);
  }
}

async function runSyncTrackedFiles() {
  await connectToDB();
  await syncTrackedFiles();
  process.exit(0);
}

runSyncTrackedFiles();
