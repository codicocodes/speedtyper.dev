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

  // todo check by date to not send inflated wpms
  // drop table?
  // hard refresh on stats
  // see your stats going down is very FeelsBadMan
  // where is bobby tables?

  const cpmAggregate = await ChallengeResult.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: "$userId",
        cpm: { $max: "$stats.totalCpm" },
      },
    },
  ]);

  const cpm = cpmAggregate?.[0]?.cpm ?? 0;

  const wpm = Math.floor(cpm / 5);

  const message = `${wpm.toString()} top wpm`;

  const badge = makeBadge(message);

  res.set("Cache-control", "public, max-age=86400");

  return res.type("svg").send(badge);
};

// one badge for number of games played?
// one badge for average wpm?
// top wpm?
// last 10 games wpm?
// wpm increase 30 days or 7 days
// per language?
// teapot
// how to do {} on a nordic layout feels bad man!
// get an american layout
// ggg
// command shift 8
// command shift 9
