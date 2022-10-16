import express from "express";
import cors from "cors";
import http from "http";
import socketIO from "socket.io";
import createMongoStore from "connect-mongo";
import createExpressSession from "express-session";
import createSharedSession from "express-socket.io-session";
import db from "mongoose";
import onSocketConnection from "./sockets";
import routes from "./api";
import { IGameMode } from "./types";
import RaceManager from "./RaceManager";
import pingDiscordHandler from "./api/pingDiscord";
import { connectToDB } from "./db";

declare module "express-session" {
  export interface SessionData {
    loginReferrer?: string;
    gameId?: string;
    mode?: IGameMode;
    user: {
      id: string;
      username: string;
      avatarUrl?: string;
      guest: boolean;
      banned?: boolean;
    };
    raceId: string;
  }
}

const MongoStore = createMongoStore(createExpressSession);

const session = createExpressSession({
  secret:
    process.env.SESSION_SECRET ||
    "a very secret string that you will never know about Kappa",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db.connection,
    ttl: 14 * 24 * 60 * 60, // 7 days
  }),
});

const { PORT } = process.env;

export default async () => {
  await connectToDB();
  const app = express();
  app.use(session);
  app.use(
    cors({
      origin: (origin, cb) => {
        if (process.env.NODE_ENV === "production") {
          if (!origin) {
            return cb(null, true);
          }
          if (
            [
              "https://speedtyper.dev",
              "https://www.speedtyper.dev",
              `${process.env.CLIENT_URL}`,
            ].indexOf(origin) >= 0
          ) {
            return cb(null, true);
          } else {
            return cb(null, false);
          }
        } else {
          return cb(null, true);
        }
      },
      credentials: true,
    })
  );

  // register routes
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });

  const server = http.createServer(app);

  // TODO: Cleanup cors logic
  // TODO: Add tests for cors logic
  // TODO: Upgrade to newest Socket.io v.4
  const io = socketIO(server);
  io.use(
    createSharedSession(session, {
      autoSave: true,
    })
  );

  const raceManager = new RaceManager(io);

  raceManager.logActiveRaces();

  app.post("/races/:raceId/share", pingDiscordHandler(raceManager));

  io.on("connection", onSocketConnection(raceManager));

  app.get("/connected", (_req, res) => {
    res.send({ connected: Object.keys(io.sockets.sockets).length });
  });

  const port = PORT || 5001;

  server.listen(port || 5001, () => {
    console.log(`Listening at PORT:${port}`);
  });
};
