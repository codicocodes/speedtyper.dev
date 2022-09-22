import { Request, Response } from "express";
import RaceManager from "RaceManager";

const pingDiscord =
  (raceManager: RaceManager) => (req: Request, res: Response) => {
    const user = req.session.user;
    const { raceId } = req.params;

    if (!raceId || !user) {
      return res.status(400).send({ message: "So bad" });
    }

    const race = raceManager.getRaceById(raceId);

    if (!race) {
      return res
        .status(404)
        .send({ message: "What are you doing giving a race id with no race" });
    }

    race.pingDiscord(user);

    return res.send({ message: "So successful probably" });
  };

export default pingDiscord;
