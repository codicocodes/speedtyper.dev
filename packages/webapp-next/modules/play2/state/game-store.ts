import create from "zustand";

export interface GameState {
  id?: string;
  owner?: string;
  members: Record<string, RacePlayer>;
  count: number;
  connected: boolean;
}

export interface RacePlayer {
  id: string;
  username: string;
  progress: number;
  recentlyTypedLiteral: string;
}

export const useGameStore = create<GameState>((_set, _get) => ({
  connected: true,
  count: 0,
  members: {},
}));
