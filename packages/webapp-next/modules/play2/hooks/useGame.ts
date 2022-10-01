import { useMemo } from "react";
import Socket from "../../../Socket";
import { Game } from "../services/Game";

export const useGame = (socket: Socket) => {
  return useMemo(() => new Game(socket), [socket]);
};
