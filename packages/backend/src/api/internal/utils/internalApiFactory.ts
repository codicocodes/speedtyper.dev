import { Request, Response } from "express";
import { Types } from "mongoose";
import { validateApiToken } from "./validateInternalToken";
const { ObjectId } = Types;

let running = false;

export const internalApiFactory =
  (model: any) => async (req: Request, res: Response) => {
    try {
      validateApiToken(req);
    } catch (err) {
      res.status(401).send("unauthorized");
      return;
    }
    if (running) {
      res.status(401).send("unauthorized");
      return;
    }
    running = true;

    try {
      const cursor = model.find({});

      for await (const doc of cursor) {
        const createdAt = ObjectId(doc._id).getTimestamp();
        const data = doc.toObject();
        data.__createdAt = createdAt;
        res.write(JSON.stringify(data));
      }
      res.end();
    } finally {
      running = false;
    }
  };
