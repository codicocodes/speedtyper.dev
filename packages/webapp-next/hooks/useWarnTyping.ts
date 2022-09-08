import { useState, useEffect } from "react";
import { IUserGameState } from "../types";

export default (waiting: boolean, userState: IUserGameState): boolean => {
  const [warnTyping, setWarnTyping] = useState(false);

  const endTime = userState?.endTime;
  const nextChar = userState?.renderedStrings.nextChar;
  const wrongCharLength = userState?.renderedStrings?.wrongChars?.length ?? 0;

  useEffect(() => {
    if (waiting || !nextChar) {
      setWarnTyping(false);
    } else if (wrongCharLength > 4) {
      setWarnTyping(true);
    } else {
      setWarnTyping(false);
    }
  }, [waiting, endTime, nextChar]);
  return warnTyping;
};
