import { useEffect, useState } from "react";

export default (
  nextChar: string,
  wrongChars: string,
  endTime?: number,
  startTime?: number
) => {
  const [blockTyping, setBlockTyping] = useState(true);

  useEffect(() => {
    if (!startTime) {
      setBlockTyping(true);
      return;
    }
    if (endTime || !nextChar) {
      setBlockTyping(true);
      return;
    }

    if (startTime) {
      setBlockTyping(wrongChars.length > 12);
    }
  }, [wrongChars, endTime, startTime, nextChar]);

  return blockTyping;
};
