import { Types } from "mongoose";
import { CodeChallenge } from "./model";

export async function bulkUpsertCodeChallenges(
  repositoryId: Types.ObjectId,
  treeSha: string,
  sha: string,
  filePath: string,
  snippets: { content: string; permaUrl: string }[]
) {
  await CodeChallenge.bulkWrite(
    snippets.map(({ content, permaUrl }) => ({
      updateOne: {
        filter: { content, filePath },
        update: {
          $set: {
            permaUrl,
            repositoryId,
            filePath,
            treeSha,
            sha,
          },
        },
        upsert: true,
      },
    }))
  );
}
