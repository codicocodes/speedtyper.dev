import { Types } from "mongoose";
import { GithubNode } from "../../connectors/github/schema/tree";
import { TrackedFile } from "./model";

export async function bulkUpsertTrackedFiles(
  repositoryId: Types.ObjectId,
  currentTreeSha: string,
  nodes: GithubNode[]
) {
  await TrackedFile.bulkWrite(
    nodes.map((node) => ({
      updateOne: {
        filter: { repositoryId, path: node.path },
        update: {
          $set: {
            repositoryId,
            path: node.path,
            currentSha: node.sha,
            currentTreeSha,
          },
        },
        upsert: true,
      },
    }))
  );
}
