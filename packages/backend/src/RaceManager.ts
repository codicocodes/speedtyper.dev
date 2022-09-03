import delay from "delay";
import Race from "./Race";
import getRaceIdFromSocket from "./utils/getRaceIdFromSocket";
import getUserFromSocket from "./utils/getUserFromSocket";
import { IGameMode, IUser } from "./types";
import leaveSocketRoom from "./utils/leaveSocketRoom";
import removeRaceIdFromSocket from "./utils/removeRaceIdFromSocket";

export interface IJoinGameArgs {
  language: string | null;
  mode: IGameMode;
  gameId: string | null;
}

export type RaceId = string | null;

export default class RaceManager {
  waitingRaceId: null | string;
  currentRaces: { [id: string]: Race };
  lastMultiplayerPing: Date;
  constructor(private io: SocketIO.Server) {
    this.waitingRaceId = null;
    this.currentRaces = {};
    this.io = io;
  }

  removeRaceIdFromSocketSession(socket: SocketIO.Socket) {
    if (!!socket?.handshake?.session?.raceId) {
      delete socket.handshake.session.raceId;
    }
  }

  onDisconnect(socket: SocketIO.Socket) {
    const user = getUserFromSocket(socket);
    const raceId = getRaceIdFromSocket(socket);
    const race = raceId ? this.getRaceById(raceId) : null;
    const userId = user.id;
    console.log("on disconnected being called", { userId });
    race?.removeUser(userId);
    this.removeRaceIdFromSocketSession(socket);
  }

  queueResetWaitingRaceId(ms: number): void {
    setTimeout(() => {
      this.resetWaitingRaceId();
    }, ms);
  }

  resetWaitingRaceId() {
    this.waitingRaceId = null;
  }

  leavePreviousRace(socket: SocketIO.Socket, newRaceId: string) {
    const raceId = getRaceIdFromSocket(socket);
    if (raceId && raceId !== newRaceId) {
      const user = getUserFromSocket(socket);
      const userId = user?.id;
      console.log(
        "Leaving race before connecting in play. Something is wrong.",
        { raceId, userId }
      );
      leaveSocketRoom(socket, userId, raceId);
      removeRaceIdFromSocket(socket);
      const race = this.currentRaces[raceId];
      race?.removeUser(userId);
    }
  }

  play(
    socket: SocketIO.Socket,
    { language, mode, gameId }: IJoinGameArgs = {
      mode: IGameMode.MULTIPLAYER,
      language: null,
      gameId: null,
    }
  ) {
    const user = getUserFromSocket(socket);

    switch (mode) {
      case IGameMode.PRIVATE:
        if (gameId && !this.getRaceById(gameId)) {
          return this.createRace(socket, user, language, mode, gameId);
        }

        const isOwner = !gameId;

        return isOwner
          ? this.createRace(socket, user, language, mode, null)
          : // @ts-ignore raceId is always defined here
            this.joinRace(socket, user, gameId);
      case IGameMode.MULTIPLAYER:
      default:
        if (this.waitingRaceId) {
          this.joinRace(socket, user, this.waitingRaceId);
          return;
        }

        const race = this.createRace(
          socket,
          user,
          language,
          IGameMode.MULTIPLAYER,
          gameId
        );
        this.waitingRaceId = race.id;
        return;
    }
  }

  private createRace(
    socket: SocketIO.Socket,
    user: IUser,
    language: string | null,
    mode: IGameMode,
    raceId: string | null
  ): Race {
    const race = new Race(this, this.io, user, language, mode, raceId);
    this.leavePreviousRace(socket, race.id);
    race.join(socket, user);
    this.currentRaces[race.id] = race;
    this.checkCloseRoom(race.id);
    return race;
  }

  async logActiveRaces() {
    while (true) {
      await delay(30000);
      const races = Object.keys(this.currentRaces);

      const numActiveRaces = races.length;

      console.log("Checking active races...", {
        numActiveRaces,
      });
    }
  }

  private async checkCloseRoom(raceId: string) {
    while (this.currentRaces[raceId]) {
      await delay(10000);
      const race = this.currentRaces[raceId];
      const activeUsers = race.getActiveUsers();
      const numActiveUsers = activeUsers.length;
      const hasActiveUsers = numActiveUsers > 0;

      console.log("Checking room activity..", {
        raceId,
        numActiveUsers,
        hasActiveUsers,
        users: activeUsers.map((user) => user.id),
        lastActivity: race.lastActivity,
      });

      if (!hasActiveUsers) {
        console.log("Closing room.", { raceId });
        Object.values(this.currentRaces[raceId].users).forEach((user) => {
          user.kickedFromRace("inactivity");
        });
        delete this.currentRaces[raceId];
      }
    }
  }

  private joinRace(socket: SocketIO.Socket, user: IUser, raceId: string) {
    this.leavePreviousRace(socket, raceId);
    const race = this.getRaceById(raceId);
    race?.join(socket, user); // @TODO create race as backup?
  }

  getRaceById(id: string): Race | null {
    const race = this.currentRaces[id];
    return race ?? null;
  }

  onRefreshChallenge(socket: SocketIO.Socket, language: string | null): void {
    const raceId = getRaceIdFromSocket(socket);
    const race = raceId ? this.getRaceById(raceId) : null;
    race?.refreshChallenge(language);
  }

  onInputChange(socket: SocketIO.Socket, pressedKey: string): void {
    const user = getUserFromSocket(socket);
    const raceId = getRaceIdFromSocket(socket);
    const race = raceId ? this.getRaceById(raceId) : null;
    race?.onInputChange(user, pressedKey);
  }

  onBackspacePress(socket: SocketIO.Socket): void {
    const user = getUserFromSocket(socket);
    const raceId = getRaceIdFromSocket(socket);
    const race = raceId ? this.getRaceById(raceId) : null;
    race?.onBackspacePress(user);
  }

  onStartRaceCommand(socket: SocketIO.Socket): void {
    const user = getUserFromSocket(socket);
    const raceId = getRaceIdFromSocket(socket);
    const race = raceId ? this.getRaceById(raceId) : null;
    const isOwner = race?.checkOwner(user.id);
    if (isOwner) {
      race?.queueRaceStarted(5000);
    }
  }
}
