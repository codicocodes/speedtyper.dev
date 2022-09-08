import { useEffect } from "react";
import { IUserGameState } from "../types/";

export default (socket: any, userGameState: IUserGameState) => {
  const correctChars = userGameState?.renderedStrings?.correctChars;
  useEffect(() => {
    if (socket && correctChars) {
      // socket.emit("user_progress_updated", userGameState);
    }
  }, [correctChars]);
};
