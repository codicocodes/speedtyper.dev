import { Request, Response } from "express";
import ChallengeEvent from "../models/challengeEvents";

export default async (_req: Request, res: Response) => {
  const event = "challenge_started";
  const played = await ChallengeEvent.countDocuments({ event });
  res.send({ played });
};
