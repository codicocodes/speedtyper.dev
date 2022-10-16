import create from "zustand";

export interface GameState {
  id?: string;
  owner?: string;
  members: Record<string, RacePlayer>;
}

export interface RacePlayer {
  id: string;
  username: string;
  progress: number;
  previousLiteral: string;
}

export const useGameStore = create<GameState>((_set, _get) => ({
  members: {},
}));
