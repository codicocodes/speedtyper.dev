import delay from "delay";
import { IChallenge, IUser, IPressedKey } from "./types";
import GameStats from "./GameStats";
import Race from "./Race";
import TimerTicker from "./TimerTicker";
import getUserFromSocket from "./utils/getUserFromSocket";
import ChallengeResult, { ChallengeResultDoc } from "./models/challengeResult";
import leaveSocketRoom from "./utils/leaveSocketRoom";

export default class UserRaceState {
  id: string;
  input: string;
  index: number;
  correctInput: string;
  hasMistake: boolean;
  endTime?: number | null;
  gameStats: GameStats;
  pressedKeys: IPressedKey[];
  cpmTimeSeries: { cpm: number }[];
  timerTicker: TimerTicker;
  lastActivity: Date;
  active: boolean;
  constructor(
    // @ts-ignore
    private race: Race,
    private io: SocketIO.Server,
    private socket: SocketIO.Socket,
    private raceId: string,
    private user: IUser
  ) {
    this.id = this.user.id;
    this.input = "";
    this.index = 0;
    this.correctInput = "";
    this.hasMistake = false;
    this.gameStats = new GameStats();
    this.cpmTimeSeries = [];
    this.pressedKeys = [];
    this.timerTicker = new TimerTicker();
    this.lastActivity = new Date();
    this.active = true;
  }

  toObject() {
    return {
      id: this.id,
      input: this.input,
      index: this.index,
      hasMistake: this.hasMistake,
      renderedStrings: this.race.defaultRenderedStrings ?? {},
      gameStats: this.gameStats.toObject(),
      user: this.user,
    };
  }

  async raceLoop(): Promise<void> {
    while (!this.endTime && this.race.active) {
      await delay(1000);
      this.updateCpmTimeSeries();
      this.checkActivity();
    }
  }

  refresh() {
    this.endTime = null;
    this.input = "";
    this.index = 0;
    this.hasMistake = false;
    this.gameStats = new GameStats();
    this.cpmTimeSeries = [];
    this.timerTicker = new TimerTicker();
  }

  kickedFromRace(reason: string) {
    this.socket.emit("race_disconnected", {
      reason,
    });
  }

  leaveRace(): void {
    this.active = false;
    leaveSocketRoom(this.socket, this.id, this.race.id);
  }

  checkActivity() {
    const now = new Date();
    const diff = now.getTime() - this.lastActivity.getTime();
    if (diff > 60 * 5 * 1000) {
      // 5 minutes of inactivity
      console.log("User kicked for beeing inactivtive piece of", this.id);
      this.race.removeUser(this.id);
      this.active = false;
      this.endTime = new Date().getTime();
      this.kickedFromRace("inactivity");
    }
  }

  updateCpmTimeSeries() {
    const startLength = this.timerTicker.startInputLength;
    const correctlyTypedLen = this.correctInput.length;
    const typed = correctlyTypedLen - startLength;
    const initialCpm = Math.floor(typed * (60000 / 1000));
    const cpm = initialCpm < 0 ? 0 : initialCpm;
    this.cpmTimeSeries.push({ cpm });
    this.gameStats.updateTrailingCpm(cpm);
    this.timerTicker.startInputLength = correctlyTypedLen;
  }

  updateLastActivity() {
    this.lastActivity = new Date();
  }

  sendProgressUpdated() {
    const userId = this.id;
    if (this.raceId) {
      this.io.in(this.raceId).emit("user_progress_updated", {
        userId: this.id,
        progress: this.gameStats.progress,
        trailingCpm: this.gameStats.trailingCpm,
      });
    } else {
      console.error("sendProgressUpdated: There is not raceId on the user", {
        userId,
      });
    }

    return this;
  }

  sendChallengeSelected() {
    const userId = this.id;
    if (this.raceId) {
      this.io.in(this.raceId).emit("user_progress_updated", {
        userId,
        progress: this.gameStats.progress,
      });

      this.socket.emit("user_race_state_updated", this.toObject());
    } else {
      console.error("sendChallengeSelected: There is not raceId on the user", {
        userId,
      });
    }
  }

  getTypedChar(pressedKey: string): string {
    return pressedKey === "Enter" ? "\n" : pressedKey;
  }

  findPreviousIndex(challenge: IChallenge): number {
    let nextIndex = this.index - 1;
    for (nextIndex; nextIndex >= 0; nextIndex--) {
      // FIXME: gh-47: there is an exception happening in production
      // challenge.chars[nextIndex] can be undefined, this should not be the case
      // It would lead to an exception before adding optional chaining
      // the state logic should be refactored with unit tests
      // to make sure we cannot get into invalid states
      if (!challenge.chars[nextIndex]?.skipped) {
        break;
      }
    }
    return nextIndex;
  }

  findNextIndex(challenge: IChallenge): number {
    if (!challenge) {
      return 0;
    }

    let nextIndex = this.index + 1;

    for (nextIndex; nextIndex < challenge.chars.length; nextIndex++) {
      if (!challenge.chars[nextIndex]) {
        break;
      }

      if (!challenge.chars[nextIndex].skipped) {
        break;
      }

      if (!nextIndex) {
        break;
      }
    }
    return nextIndex;
  }

  updateInput(pressedKey: string): UserRaceState {
    if (pressedKey === "backspace") {
      this.input = this.input.substr(0, this.input.length - 1);
    } else {
      this.input = this.input.concat(this.getTypedChar(pressedKey));
    }
    return this;
  }

  updateHasMistake(challenge: IChallenge): UserRaceState {
    const hadMistake = this.hasMistake;
    this.hasMistake =
      this.input !== challenge.strippedCode.substr(0, this.input.length);
    if (!hadMistake && !this.hasMistake) {
      this.correctInput = this.input;
    }
    return this;
  }

  resetCpmTimeSeries() {
    this.cpmTimeSeries = [];
    this.pressedKeys = [];
  }

  updateGameStats(challenge: IChallenge, time: number): UserRaceState {
    this.gameStats.handleKeyPress(
      challenge,
      this.correctInput,
      this.hasMistake,
      time
    );
    return this;
  }

  onCompleted(): UserRaceState {
    const endTime = new Date().getTime();
    // @ts-ignore
    const time = endTime - (this?.race?.startTime ?? 0);
    const totalSeconds = Math.floor(time / 1000);
    const { username, guest, avatarUrl } = getUserFromSocket(this.socket);
    const cpm = this.gameStats.totalCpm;
    const accuracy = this.gameStats.accuracy;
    const cpmTimeSeries = this.cpmTimeSeries;
    this.endTime = endTime;
    this.io.in(this.raceId).emit("race_completed", {
      userId: this.id,
      endTime,
      cpm,
      accuracy,
      totalSeconds,
      guest,
      username,
      avatarUrl,
      cpmTimeSeries,
    });

    return this;
  }

  updatePressedKeys(key: string): UserRaceState {
    // @todo maybe we should add if the keypress was a mistake or not?
    this.pressedKeys.push({ key, time: new Date().getTime() });
    return this;
  }

  onInputChange(pressedKey: string): UserRaceState {
    const { challenge } = this.race;
    const time = this.race.getTime();

    this.index = this.findNextIndex(challenge);

    this.updateInput(pressedKey)
      .updateHasMistake(challenge)
      .updateGameStats(challenge, time)
      .sendProgressUpdated()
      .handleRaceCompleted();

    this.updateLastActivity();

    return this;
  }

  getChallengeResultData(): ChallengeResultDoc | undefined {
    // todo is this what we actually want in time?
    const time = (this?.endTime ?? 0) - (this?.race?.startTime ?? 0);
    const totalSeconds = Math.floor(time / 1000);

    if (this.race.challenge._id) {
      return new ChallengeResult({
        userId: this.id,
        challengeId: this.race.challenge._id,
        time: this.endTime,
        totalSeconds,
        stats: this.gameStats.toObject(),
      });
    }
    return;
  }

  async handleRaceCompleted(): Promise<UserRaceState> {
    if (
      !this.hasMistake &&
      (this.input === this.race.challenge.strippedCode ||
        this.input + "\n" === this.race.challenge.strippedCode)
    ) {
      this.onCompleted();
      if (!this.user.guest) {
        try {
          const result = this.getChallengeResultData();
          // const result = new ChallengeResult(this.toObject());
          if (result) {
            await result.save();
          }
        } catch (e) {
          console.log("error", e);
        }
      }
    }
    return this;
  }

  onBackspacePress(race: Race): UserRaceState {
    if (!this.hasMistake) {
      return this;
    }

    const { challenge } = race;

    this.index = this.findPreviousIndex(challenge);

    this.updateInput("backspace").updateHasMistake(challenge);

    this.updateLastActivity();

    return this;
  }
}
