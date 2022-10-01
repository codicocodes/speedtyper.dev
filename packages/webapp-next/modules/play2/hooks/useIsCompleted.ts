import { useCodeStore } from "../state/code-store";

export const useIsCompleted = () => {
  useCodeStore((state) => state.correctIndex);
  return useCodeStore((state) => state.isCompleted)();
};
