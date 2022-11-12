import { useEffect } from "react";
import { useCodeStore } from "../state/code-store";

export function useResetStateOnUnmount() {
  const initialize = useCodeStore((state) => state.initialize);
  useEffect(() => {
    return () => {
      initialize("");
    };
  }, [initialize]);
}
