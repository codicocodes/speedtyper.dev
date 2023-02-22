import challengeResult, { ChallengeResultDoc } from "../models/challengeResult";
import fetch from "node-fetch";
import mongoose from "mongoose";

export async function* getResultBatches() {
  const batchSize = 500;
  const cursor = challengeResult.find({}).cursor({ batchSize });
  const totalDocuments = await challengeResult.find({}).count();
  let count = 0;
  let resultsBatch = [];
  for await (const result of cursor) {
    const r: any = result.toJSON();
    r.__createdAt = mongoose.Types.ObjectId(result._id).getTimestamp();
    resultsBatch.push(r);
    if (resultsBatch.length === batchSize) {
      yield resultsBatch;
      count += resultsBatch.length;
      console.log(`Sent ${count}/${totalDocuments}`);
      resultsBatch = [];
    }
  }
  if (resultsBatch.length > 0) {
    yield resultsBatch;
    count += resultsBatch.length;
    console.log(`Sent ${count}/${totalDocuments}`);
  }
}

export async function exportResultBatches() {
  for await (const resultBatch of getResultBatches()) {
    await sendResults(resultBatch);
  }
}

export const INTERNAL_BASE_URL =
  process.env.INTERNAL_API_BASE_URL ?? "http://localhost:1337/api/internal";

export const RESULTS_API = `${INTERNAL_BASE_URL}/results`;

export async function sendResults(results: ChallengeResultDoc[]) {
  const apiToken = process.env.INTERNAL_API_TOKEN ?? "";
  await fetch(RESULTS_API, {
    method: "POST",
    body: JSON.stringify(results),
    headers: {
      "Content-Type": "application/json",
      "api-token": apiToken,
    },
  }).then((res) => res.json());
}
