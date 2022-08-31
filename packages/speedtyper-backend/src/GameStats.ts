import { IChallenge } from "./types";
import stripIndentation from "./utils/stripIndentation";

export default class GameStats {
  mistakeCount: number;
  typedCharsCount: number;
  combo: number;
  maxCombo: number;
  totalCpm: number;
  accuracy: number;
  trailingCpm: number;
  progress: number;
  keyPresses: any[];
  constructor() {
    this.progress = 0;
    this.mistakeCount = 0;
    this.typedCharsCount = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.totalCpm = 0;
    this.accuracy = 0;
    this.trailingCpm = 0;
    this.keyPresses = [];
  }

  toObject() {
    return {
      progress: this.progress,
      mistakeCount: this.mistakeCount,
      typedCharsCount: this.typedCharsCount,
      combo: this.combo,
      maxCombo: this.maxCombo,
      totalCpm: this.totalCpm,
      accuracy: this.accuracy,
      trailingCpm: this.trailingCpm,
      keyPresses: this.keyPresses,
    };
  }

  updateAccuracy(): GameStats {
    this.accuracy = Math.floor(
      ((this.typedCharsCount - this.mistakeCount) / this.typedCharsCount) * 100
    );

    return this;
  }

  updateProgress(correctCharCount: number, challenge: IChallenge): GameStats {
    this.progress = Math.floor(
      (correctCharCount * 100) /
        stripIndentation(challenge.fullCodeString ?? "").length
    );
    return this;
  }

  updateTotalCpm(correctCharCount: number, time: number) {
    this.totalCpm = Math.floor(correctCharCount / (time / 60000));
    return this;
  }

  updateTrailingCpm(cpm: number) {
    this.trailingCpm = cpm;
  }

  handleKeyPress(
    challenge: IChallenge,
    correctInput: string,
    hasMistake: boolean,
    time: number
  ): GameStats {
    this.combo = hasMistake ? 0 : this.combo + 1;

    this.mistakeCount = this.mistakeCount + Number(hasMistake);

    this.maxCombo = this.combo > this.maxCombo ? this.combo : this.maxCombo;

    this.typedCharsCount = this.typedCharsCount + 1;

    this.updateAccuracy();

    this.updateTotalCpm(correctInput.length, time);

    this.updateProgress(correctInput.length, challenge);

    return this;
  }
}
