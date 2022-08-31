import { RequestHandler } from "express";
import { ObjectId } from "mongoose";

export interface IGameState {
  id: string;
  owner: string | null;
  challenge: IChallenge;
  waiting: boolean;
  mode: IGameMode;
  users: { [id: string]: IUserGameState };
}

export interface IUserGameState {
  id: string;
  gameId: string;
  input: string;
  index: number;
  hasMistake: boolean;
  timer: ITimer;
  gameStats: IGameStats;
  username: string;
  guest: boolean;
  avatarUrl: string;
}

export interface IUser {
  id: string;
  username: string;
  avatarUrl?: string;
  guest: boolean;
}

export interface IRenderedStrings {
  skippedChars: string;
  correctChars: string;
  wrongChars: string;
  indentation: string;
  nextChar: string;
  untypedChars: string;
}

export interface ITimer {
  startTime?: number;
  endTime?: number;
  time?: number;
  totalSeconds?: number;
}

export interface IGameStats {
  mistakeCount: number;
  typedCharsCount: number;
  combo: number;
  maxCombo: number;
  totalCpm: number;
  trailingCpm: number;
  cpmTimeSeries: { cpm: number; time: number }[];
  accuracy: number;
}

export interface IPressedKey {
  key: string;
  time: number;
}

export interface IChar {
  value: string;
  skipped: boolean;
  isNextChar: boolean;
}

export interface IChallengeRaw {
  _id?: ObjectId;
  name: string;
  language: string;
  project: string;
  projectUrl: string;
  description?: string;
  license: string;
  licenseUrl: string;
  source: string;
}
export interface IChallenge {
  _id?: ObjectId;
  type?: string;
  name: string;
  project: string;
  projectUrl: string;
  description?: string;
  language: string;
  license: string;
  licenseUrl: string;
  source: string;
  fullCodeString: string;
  strippedCode: string;
  startIndex: number;
  chars: IChar[];
}

export interface IAction {
  payload?: any;
  type: string;
}

export interface IParsedCode {
  fullCodeString: string;
  type: string;
}

export interface IProcessedCode {
  chars: IChar[];
  strippedCode: string;
}

export enum HttpMethods {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete",
}

export enum IGameMode {
  MULTIPLAYER = "multiplayer",
  SOLO = "solo",
  PRIVATE = "private",
}

export interface IRoute {
  method: HttpMethods;
  path: string;
  middlewares?: RequestHandler[];
  handler: RequestHandler;
}

export interface IToplistResult {
  challengeName: string;
  projectName: string;
  type: string;
  cpm: number;
  accuracy: number;
  username: string;
  avatarUrl?: string;
}
