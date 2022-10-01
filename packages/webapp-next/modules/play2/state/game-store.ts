import create from "zustand";

interface TypedChar {
  char: string;
  timestamp: Date;
}

interface GameState {
  startTime?: Date;
  endTime?: Date;
  chars: TypedChar[];
  start: () => void;
  end: () => void;
  reset: () => void;
  isPlaying: () => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  chars: [],
  start: () => {
    set((state) => {
      return { ...state, startTime: new Date() };
    });
  },
  end: () => {
    set((state) => {
      return { ...state, endTime: new Date() };
    });
  },
  reset: () => {
    set((state) => {
      return { ...state, startTime: undefined, endTime: undefined, chars: [] };
    });
  },
  isPlaying: () => {
    return !!get().startTime && !get().endTime;
  },
}));
