import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/user";
const { ObjectId } = Types;

// we need to get sorting working inside challengeResults we also need to add a group pipelinestage for total games played
const getDateDaysAgo = (days: number) => {
  const ms = days * 24 * 60 * 60 * 1000;
  return new Date(Date.now() - ms);
};

export default async (req: Request, res: Response) => {
  const { id: username } = req.params;
  const startMonthly = getDateDaysAgo(30);
  const startAnnual = getDateDaysAgo(365);

  const results = await User.aggregate([
    { $match: { username } },
    // { $group: { _id: "$userId", doc: { $first: "$$ROOT" } } },
    // { $replaceRoot: { newRoot: "$doc" } },
    {
      $lookup: {
        from: "challengeresults",
        let: { userId: "$_id" },
        as: "monthly",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$userId", "$$userId"] }],
              },
            },
          },
          {
            $group: {
              _id: "$userId",
              total: { $sum: "$totalSeconds" },
              gamesPlayed: { $sum: 1 },
              data: { $push: "$$ROOT" },
            },
          },
          { $unwind: { path: "$data", preserveNullAndEmptyArrays: true } },
          {
            $match: {
              $expr: {
                $gte: ["$data.time", startMonthly],
              },
            },
          },
          {
            $group: {
              _id: { $dayOfMonth: "$data.time" },
              maxCpm: { $max: "$data.stats.totalCpm" },
              minCpm: { $min: "$data.stats.totalCpm" },
              averageCpm: { $avg: "$data.stats.totalCpm" },
              date: {
                $first: {
                  $dateToString: {
                    date: "$data.time",
                    format: "%Y-%m-%d",
                  },
                },
              },
              totalSecondsPlayed: { $first: "$total" },
              gamesPlayed: { $first: "$gamesPlayed" },
            },
          },
          { $sort: { date: 1 } },
        ],
      },
    },
    {
      $lookup: {
        from: "challengeresults",
        let: { userId: "$_id" },
        as: "annual",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$userId", "$$userId"] },
                  { $gte: ["$time", startAnnual] },
                ],
              },
            },
          },
          {
            $group: {
              _id: { $month: "$time" },
              maxCpm: { $max: "$stats.totalCpm" },
              minCpm: { $min: "$stats.totalCpm" },
              averageCpm: { $avg: "$stats.totalCpm" },
              date: {
                $first: {
                  $dateToString: {
                    date: "$time",
                    format: "%Y-%m",
                  },
                },
              },
            },
          },
          { $sort: { date: 1 } },
        ],
      },
    },
  ]);

  const lastMonthUserResults = {
    ...results?.[0],
    totalSecondsPlayed: results?.[0]?.monthly?.[0]?.totalSecondsPlayed,
    gamesPlayed: results?.[0]?.monthly?.[0]?.gamesPlayed,
  };

  const noResultFound = !lastMonthUserResults._id;

  if (!username || !results || noResultFound) {
    return res.status(404).send();
  }

  lastMonthUserResults.createdAt = ObjectId(
    lastMonthUserResults._id
  ).getTimestamp();

  delete lastMonthUserResults._id;
  delete lastMonthUserResults.githubId;
  delete lastMonthUserResults.email;

  return res.send(lastMonthUserResults);
};
