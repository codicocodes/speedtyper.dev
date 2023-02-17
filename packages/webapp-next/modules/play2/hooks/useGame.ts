import { useMemo } from "react";
import { Game } from "../services/Game";
import { useConnectionStore } from "../state/connection-store";
import { useInitialRaceIdQueryParam } from "./useGameIdQueryParam";

export const useGame = () => {
  const raceIdQueryParam = useInitialRaceIdQueryParam();
  const socket = useConnectionStore((s) => s.socket);
  return useMemo(
    () => socket && new Game(socket, raceIdQueryParam),
    [socket, raceIdQueryParam]
  );
};
