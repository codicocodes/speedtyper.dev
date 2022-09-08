import { useEffect } from "react";
import { IChallenge } from "../types/";
import Socket from "../Socket";

export default (
  socket: Socket | null,
  challenge: IChallenge | undefined,
  correctChars: string
) => {
  const referrer = typeof document !== "undefined" ? document?.referrer : null;

  useEffect(() => {
    if (challenge && socket && correctChars.length === 1) {
      const event = "challenge_started";
      socket.emit(event, { challengeId: challenge._id, referrer });
    }
  }, [correctChars]);
};
