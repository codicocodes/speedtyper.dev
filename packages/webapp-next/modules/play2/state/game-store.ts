import create from "zustand";
import { User } from "../../../common/state/user-store";

export interface GameState {
  id?: string;
  owner?: string;
  connected: boolean;
  members: Record<string, RacePlayer>;
  results: RaceResult[];
  myResult?: RaceResult;
}

export interface RacePlayer {
  id: string;
  username: string;
  progress: number;
  recentlyTypedLiteral: string;
}

export interface RaceResult {
  id: string;
  raceId: string;
  timeMS: number;
  cpm: number;
  mistakes: number;
  accuracy: number;
  createdAt: Date;
  user: User;
  userId: string;
}

export const useGameStore = create<GameState>((_set, _get) => ({
  connected: true,
  count: 0,
  members: {},
  results: [],
}));
