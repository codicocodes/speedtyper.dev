import UserRaceState from "./UserRaceState";
import type { IChallenge } from "./types";
import stripIndentation from "./utils/stripIndentation";

export default class RenderedStrings {
  skippedChars: string;
  correctChars: string;
  wrongChars: string;
  indentation: string;
  nextChar: string;
  untypedChars: string;
  constructor(challenge?: IChallenge) {
    this.skippedChars =
      challenge?.fullCodeString?.substring(0, challenge.startIndex) ?? "";
    this.correctChars = "";
    this.wrongChars = "";
    this.indentation = "";
    this.nextChar = challenge?.fullCodeString?.[challenge.startIndex] ?? "";
    this.untypedChars =
      challenge?.fullCodeString?.slice(challenge.startIndex + 1) ?? "";
  }

  toObject() {
    return {
      skippedChars: this.skippedChars,
      correctChars: this.correctChars,
      wrongChars: this.wrongChars,
      indentation: this.indentation,
      nextChar: this.nextChar,
      untypedChars: this.untypedChars,
    };
  }

  getStrippedLength(): number {
    return stripIndentation(this.correctChars).length;
  }

  handleKeyPress(
    challenge: IChallenge,
    hasMistake: boolean,
    oldIndex: number,
    index: number
  ): RenderedStrings {
    this.correctChars = `${this.correctChars}${
      !hasMistake
        ? this.indentation.concat(challenge.chars[oldIndex].value)
        : ""
    }`;

    this.wrongChars = `${this.wrongChars}${
      hasMistake ? this.indentation.concat(challenge.chars[oldIndex].value) : ""
    }`;

    this.indentation = challenge.fullCodeString.slice(oldIndex + 1, index);

    this.nextChar = challenge.chars[index]?.value;

    this.untypedChars = challenge.fullCodeString.slice(index + 1);

    return this;
  }

  handleBackspace(
    userRace: UserRaceState,
    challenge: IChallenge
  ): RenderedStrings {
    const nextNextIndex = userRace.findPreviousIndex(challenge);

    this.indentation = challenge.fullCodeString.slice(
      nextNextIndex + 1,
      userRace.index
    );

    const correctCharsEnd = this.indentation
      ? nextNextIndex + 1
      : userRace.index;

    const indexDiff = userRace.index - nextNextIndex;

    this.correctChars = !userRace.hasMistake
      ? this.correctChars.substr(0, correctCharsEnd)
      : this.correctChars;

    this.wrongChars = userRace.hasMistake
      ? this.wrongChars.substr(0, this.wrongChars.length - indexDiff)
      : this.wrongChars;

    this.nextChar = challenge.chars[userRace.index].value;

    this.untypedChars = challenge.fullCodeString.slice(userRace.index + 1);

    return this;
  }
}
