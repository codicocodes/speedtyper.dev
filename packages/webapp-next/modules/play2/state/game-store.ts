import create from "zustand";
import { User, useUserStore } from "../../../common/state/user-store";
import { Game } from "../services/Game";
import { useCodeStore } from "./code-store";

export interface GameState {
  id?: string;
  owner?: string;
  members: Record<string, RacePlayer>;
  results: Record<string, RaceResult>;
  myResult?: RaceResult;
  countdown?: number;
  game?: Game;
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
  members: {},
  results: {},
}));

export const useCanType = () => {
  const game = useGameStore((s) => s.game);
  const isMultiplayer = useIsMultiplayer();
  const hasStartTime = useCodeStore((state) => state.startTime);
  return  !!game && !isMultiplayer || hasStartTime;
};

export const useIsMultiplayer = () => {
  const members = useGameStore((state) => state.members);
  return Object.values(members).length > 1;
};

export const useIsOwner = () => {
  const userId = useUserStore((state) => state.id);
  const owner = useGameStore((state) => state.owner);
  return userId === owner;
};
