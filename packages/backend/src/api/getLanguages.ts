import { Request, Response } from "express";
import Challenge from "../models/challenge";

export default async (_req: Request, res: Response) => {
  const languages = await Challenge.find().distinct("language");
  res.send(languages);
};
