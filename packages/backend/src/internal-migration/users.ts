import User from "../models/user";
import fetch from "node-fetch";
import mongoose from "mongoose";

export async function* getUserBatches() {
  const batchSize = 500;
  const cursor = User.find({}).cursor({ batchSize });
  const totalDocuments = await User.find({}).count();
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

export async function exportUserBatches() {
  for await (const userBatch of getUserBatches()) {
    await sendResults(userBatch);
  }
}

export const INTERNAL_BASE_URL =
  process.env.INTERNAL_API_BASE_URL ?? "http://localhost:1337/api/internal";

export const RESULTS_API = `${INTERNAL_BASE_URL}/users`;

export async function sendResults(users: any[]) {
  const apiToken = process.env.INTERNAL_API_TOKEN ?? "";
  const body = JSON.stringify(users);
  await fetch(RESULTS_API, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      "api-token": apiToken,
    },
  }).then((res) => {
    if (!res.ok) {
      console.log(res.statusText);
      throw new Error("error");
    }
  });
}
