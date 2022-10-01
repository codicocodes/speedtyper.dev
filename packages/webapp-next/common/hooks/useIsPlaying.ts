import { useGameStore } from "../../modules/play2/state/game-store";

export const useIsPlaying = () => {
  useGameStore((state) => state.startTime);
  useGameStore((state) => state.endTime);
  const isPlaying = useGameStore((state) => state.isPlaying)();
  return isPlaying;
};
