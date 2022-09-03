import { Request, Response } from "express";
import makeBadge from "../utils/makeBadge";

import User from "../models/user";
import ChallengeResult from "../models/challengeResult";

export default async (req: Request, res: Response) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const userId = user._id;

  const cpmAggregate = await ChallengeResult.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: "$userId",
        cpm: { $avg: "$stats.totalCpm" },
      },
    },
  ]);

  const cpm = cpmAggregate?.[0]?.cpm ?? 0;

  const wpm = Math.floor(cpm / 5);

  const message = `${wpm.toString()} avg wpm`;

  const badge = makeBadge(message);

  res.set("Cache-control", "public, max-age=86400");

  return res.type("svg").send(badge);
};
