import { Request, Response } from "express";
import formatResults from "../utils/formatResults";
import ChallengeResult from "../models/challengeResult";

export default async (_req: Request, res: Response) => {
  const start = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const results = await ChallengeResult.aggregate([
    { $match: { time: { $gte: start }, userId: { $exists: true } } },
    { $sort: { "stats.totalCpm": -1 } },
    { $group: { _id: "$userId", doc: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$doc" } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "challenges",
        localField: "challengeId",
        foreignField: "_id",
        as: "challenge",
      },
    },
    { $match: { "user.banned": { $ne: true } } },
    { $sort: { "stats.totalCpm": -1 } },
    { $limit: 50 },
  ]);

  const formattedResults = formatResults(results);

  return res.send(formattedResults);
};
