import { useCodeStore } from "../../modules/play2/state/code-store";

export const useIsPlaying = () => {
  useCodeStore((state) => state.startTime);
  useCodeStore((state) => state.endTime);
  const isPlaying = useCodeStore((state) => state.isPlaying)();
  return isPlaying;
};
