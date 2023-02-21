import { Request, Response } from "express";
import { validateApiToken } from "./validateInternalToken";

export const internalApiFactory =
  (model: any) => async (req: Request, res: Response) => {
    try {
      validateApiToken(req);
    } catch (err) {
      res.status(401).send("unauthorized");
      return;
    }

    const cursor = model.find({});

    for await (const data of cursor) {
      res.write(JSON.stringify(data));
    }
    res.end();
  };
