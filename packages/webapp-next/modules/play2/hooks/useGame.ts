import { useMemo } from "react";
import SocketLatest from "../../../common/services/Socket";
import { Game } from "../services/Game";

export const useGame = (socket: SocketLatest) => {
  return useMemo(() => new Game(socket), [socket]);
};
