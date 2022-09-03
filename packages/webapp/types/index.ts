export interface IGameState {
  id?: string;
  owner?: string;
  mode?: IGameMode;
  startTime?: number;
  queueTimeMs?: number;
  currentUserId?: string;
  selectedUserId?: string;
  loadingFailed: boolean;
  errorMessage?: string;
  challenge?: IChallenge;
  loaded: boolean;
  waiting: boolean;
  users: { [id: string]: IUserGameState };
}

export interface IUserGameState {
  id?: string;
  gameId?: string;
  endTime?: number;
  user: IUser;
  input: string;
  index: number;
  hasMistake: boolean;
  renderedStrings: IRenderedStrings;
  gameStats: IGameStats;
  result: any;
  cpmTimeSeries: { cpm: number; time: number }[];
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

export interface IGameStats {
  progress: number;
  mistakeCount: number;
  typedCharsCount: number;
  combo: number;
  maxCombo: number;
  totalCpm: number;
  trailingCpm: number;
  keyPresses: IKeyPress[];
  accuracy: number;
}
export interface IQueryParams {
  loading: boolean;
  id: string | null;
  mode: string | null;
}

export interface IKeyPress {
  time: number;
  key: string;
  code: string;
}

export interface IChar {
  value: string;
  skipped: boolean;
  arrayIndex: number;
  isTyped: boolean;
  isCorrect: boolean;
  isNextChar: boolean;
  isComment?: boolean;
}

export interface IChallenge {
  _id: string;
  name: string;
  project: string;
  projectUrl: string;
  description?: string;
  license: string;
  licenseUrl: string;
  source: string;
  fullCodeString?: string;
  strippedCode: string;
  startIndex: number;
  chars?: IChar[];
  type?: string;
  language: string;
}

export interface IAction {
  payload?: any;
  type: string;
}

export interface IProcessedCode {
  chars: IChar[];
  code: string;
  index: number;
}

export interface IToplistResult {
  challengeName: string;
  projectName: string;
  type: string;
  cpm: number;
  accuracy: number;
  username: string;
  guest: boolean;
  avatarUrl?: string;
  isCurrentResult?: boolean;
  time?: string;
  totalSeconds: number;
}

export enum IGameMode {
  MULTIPLAYER = "multiplayer",
  SOLO = "solo",
  PRIVATE = "private",
}
