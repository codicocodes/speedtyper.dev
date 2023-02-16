import { useMemo } from "react";
import { Game } from "../services/Game";
import { useConnectionStore } from "../state/connection-store";

export const useGame = () => {
  const socket = useConnectionStore((s) => s.socket);
  return useMemo(() => socket && new Game(socket), [socket]);
};
