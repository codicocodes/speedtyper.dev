import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  delete req.session.user;

  res.send({ succes: true });
};
