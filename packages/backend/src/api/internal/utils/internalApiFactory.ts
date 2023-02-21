import delay from "delay";
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
    const totalDocs = await model.find({}).count();
    let sent = 0;

    console.log("Total docs: ", totalDocs);

    try {
      const cursor = model.find({}).cursor({ batchSize: 100 });
      let docs = [];
      for await (const doc of cursor) {
        const createdAt = ObjectId(doc._id).getTimestamp();
        const data = doc.toObject();
        data.__createdAt = createdAt;
        docs.push(data);
        if (docs.length === 100) {
          res.write(JSON.stringify(docs));
          docs = [];
          sent += 100;
          console.log(`Sent ${sent}/${totalDocs}`);
          await delay(2000);
        }
      }
      if (docs.length > 0) {
        res.write(JSON.stringify(docs));
        sent += docs.length;
        console.log(`Sent ${sent}/${totalDocs}`);
      }
      res.end();
    } finally {
      running = false;
    }
  };
