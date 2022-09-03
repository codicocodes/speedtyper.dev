import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  if (req.session.user) {
    return res.send(req.session.user);
  }

  return res.send(null);
};
