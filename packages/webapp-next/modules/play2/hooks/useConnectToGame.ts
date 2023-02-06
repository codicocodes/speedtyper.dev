import { useEffect } from "react";
import { Game } from "../services/Game";

export function useConnectToGame(game: Game, gameID: string | undefined) {
  useEffect(() => {
    if (!gameID) {
      game.play();
    } else if (game.id !== gameID) {
      game.join(gameID);
    }
  }, [game, gameID]);
}
