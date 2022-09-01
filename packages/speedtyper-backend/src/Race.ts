import { nanoid } from "nanoid";
import delay from "delay";
import joinSocketRoom from "./utils/joinSocketRoom";
import getRandomChallenge from "./challenges/getRandomChallenge";
import { IChallenge, IUser, IGameMode, IRenderedStrings } from "./types";
import UserRaceState from "./UserRaceState";
import RaceManager from "RaceManager";
import processCode from "./utils/processCode";
import getUserFromSocket from "./utils/getUserFromSocket";
import { writeToDiscord } from "./connectors/discord";
import RenderedStrings from "./RenderedStrings";

export default class Race {
  id: string;
  owner: string | null;
  challenge: IChallenge;
  waiting: boolean;
  users: { [id: string]: UserRaceState };
  startTime?: number | null;
  active: boolean;
  countdown: boolean;
  pinged: boolean;
  defaultRenderedStrings?: IRenderedStrings;
  lastActivity: Date;
  constructor(
    private manager: RaceManager,
    private io: SocketIO.Server,
    user: IUser,
    language: string | null,
    private mode: IGameMode,
    raceId: string | null
  ) {
    this.io = io;
    this.id = raceId || nanoid();
    this.owner = user.id;
    this.refreshChallenge(language);
    this.active = false;
    this.countdown = false;
    this.users = {};
    this.pinged = false;
    this.lastActivity = new Date();
  }

  toObject() {
    return {
      id: this.id,
      waiting: this.waiting,
      owner: this.owner,
      startTime: this.startTime,
      challenge: this.challenge,
      users: Object.fromEntries(
        Object.entries(this.users).map(([id, userRaceState]) => {
          return [id, userRaceState.toObject()];
        })
      ),
    };
  }

  getActiveUsers(): UserRaceState[] {
    return Object.values(this.users).filter(({ active }) => active);
  }

  removeUser(userId: string): void {
    const user = this.users[userId];
    if (!user) {
      return;
    }
    user.leaveRace();
    delete this.users[userId];
    this.io.in(this.id).emit("user_disconnected", userId);
  }

  addRaceIdToSocketSession(socket: SocketIO.Socket) {
    if (!!socket.handshake.session) {
      socket.handshake.session.raceId = this.id;
    } else {
      const user = getUserFromSocket(socket);
      console.log("Failed adding race id to the socket session", user);
    }
  }

  join(socket: SocketIO.Socket, user: IUser) {
    this.lastActivity = new Date();
    const userRaceState = new UserRaceState(
      this,
      this.io,
      socket,
      this.id,
      user
    );

    this.users[user.id] = userRaceState;

    this.addRaceIdToSocketSession(socket);

    joinSocketRoom(socket, userRaceState, this);
  }

  handleStartRace() {
    this.queueRaceStarted(5000);
  }

  async refreshChallenge(language: string | null): Promise<void> {
    this.lastActivity = new Date();
    this.active = false;
    const unprocessedChallenge = await getRandomChallenge(language);
    const metaData = processCode(unprocessedChallenge.fullCodeString);
    const challenge: IChallenge = {
      ...unprocessedChallenge,
      ...metaData,
    };
    this.defaultRenderedStrings = new RenderedStrings(challenge).toObject();
    this.startTime = null;
    this.countdown = false;
    this.challenge = challenge;
    this.handleUpdatedChallenge();
    this.sendChallengeSelected();
    if (this.mode === IGameMode.MULTIPLAYER) {
      this.queueRaceStarted(15000);
      this.manager.queueResetWaitingRaceId(10000);
    }
  }

  handleUpdatedChallenge(): void {
    Object.values(this.users).forEach((userRaceState) => {
      userRaceState.refresh();
    });
  }

  sendChallengeSelected(): void {
    this.io.in(this.id).emit("challenge_selected", this.challenge);
    Object.values(this.users).forEach((userRaceState) => {
      userRaceState.resetCpmTimeSeries();
      userRaceState.sendChallengeSelected();
    });
  }

  async queueRaceStarted(ms: number): Promise<Race> {
    this.lastActivity = new Date();
    if (this.countdown) {
      return this;
    }
    this.countdown = true;
    const seconds = Math.floor(ms / 1000);

    for (let i = seconds; i >= 0; i--) {
      if (!this.countdown) {
        break;
      }

      if (i === 0) {
        this.sendRaceStarted();
      } else {
        this.sendCountdown(i);
      }

      await delay(1000);
    }

    this.countdown = false;

    return this;
  }

  sendCountdown(countdown: number): void {
    this.io.in(this.id).emit("countdown", countdown);
  }

  collectCpmTimeSeries() {
    Object.values(this.users).forEach((user) => {
      user.raceLoop();
    });
  }

  pingDiscord(user: IUser): void {
    if (!this.pinged) {
      if (this.mode === "private" && this.owner === user.id) {
        writeToDiscord(
          `${user.username} wants to invite you to a private race: https://speedtyper.dev/play/?mode=private&id=${this.id}`
        );
        this.pinged = true;
      }
    } else {
      const lastPing = this.manager.lastMultiplayerPing?.getMinutes() ?? 0;

      const now = new Date();

      if (now.getMinutes() - lastPing > 10) {
        writeToDiscord(
          `${user.username} is playing multiplayer and would like to play with more people: https://speedtyper.dev/play`
        );
        this.manager.lastMultiplayerPing = new Date();
        this.pinged = true;
      }
    }
  }

  sendRaceStarted(): void {
    const startTime = new Date().getTime();
    this.startTime = startTime;
    this.active = true;
    this.io.in(this.id).emit("race_started", { startTime });
    this.collectCpmTimeSeries();
  }

  getTime(): number {
    return this.startTime ? new Date().getTime() - this.startTime : 0;
  }

  getUserById(userId: string): UserRaceState | null {
    return this.users[userId] ?? null;
  }

  checkOwner(userId: string): boolean {
    return userId === this.owner;
  }

  onInputChange(user: IUser, pressedKey: string): void {
    const userId = user.id;
    const raceUser = this.users[userId];
    if (raceUser) {
      raceUser.onInputChange(pressedKey);
    } else {
      console.error("ERROR: There is no user in the race", { userId });
    }
  }

  onBackspacePress(user: IUser): void {
    const userId = user.id;
    const raceUser = this.users[userId];
    if (raceUser) {
      this.users[user.id]?.onBackspacePress(this);
    } else {
      console.error("BACKSPACE: There is no user in the race", { userId });
    }
  }
}
