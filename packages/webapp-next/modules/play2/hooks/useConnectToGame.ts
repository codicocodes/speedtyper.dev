import { useEffect } from "react";
import { Game } from "../services/Game";

export function useConnectToGame(game: Game, gameID: string | undefined) {
  useEffect(() => {
    gameID ? game.join(gameID) : game.play();
  }, [game, gameID]);
}
