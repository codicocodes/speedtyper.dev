import { Request, Response } from "express";
// import mongoose from "mongoose";
// import formatResults from "../utils/formatResults";
// import ChallengeResult from "../models/challengeResult";

export default async function getTopResultsByChallengeIdRequest(
  _: Request,
  res: Response
) {
  res.send([]);
  return;
  // const { id } = req.params;

  // console.time(`getTopResultsByChallengeId: ${id.toString()}-${req.sessionID}`);

  // const results = await ChallengeResult.aggregate([
  //   {
  //     $match: {
  //       challengeId: mongoose.Types.ObjectId(id),
  //       userId: { $exists: true },
  //     },
  //   },
  //   { $sort: { "stats.totalCpm": -1 } },
  //   { $group: { _id: "$userId", doc: { $first: "$$ROOT" } } },
  //   { $replaceRoot: { newRoot: "$doc" } },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "userId",
  //       foreignField: "_id",
  //       as: "user",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "challenges",
  //       localField: "challengeId",
  //       foreignField: "_id",
  //       as: "challenge",
  //     },
  //   },
  //   { $match: { "user.banned": { $ne: true } } },
  //   { $sort: { "stats.totalCpm": -1 } },
  //   { $limit: 10 },
  // ]);

  // const formattedResults = formatResults(results);

  // console.timeEnd(
  //   `getTopResultsByChallengeId: ${id.toString()}-${req.sessionID}`
  // );

  // res.send(formattedResults);
}
