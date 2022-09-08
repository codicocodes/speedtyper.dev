import { useEffect, useState } from "react";

export default (startTime?: number, endTime?: number): number => {
  const [totalSeconds, setTotalSeconds] = useState(0);

  let currTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (startTime && !endTime) {
      currTimeout = setTimeout(() => {
        setTotalSeconds((totalSeconds) => {
          return totalSeconds + 1;
        });
      }, 1000);
    } else if (!endTime) {
      setTotalSeconds(0);
    }

    return () => clearTimeout(currTimeout);
  }, [totalSeconds, startTime, endTime]);

  return totalSeconds;
};
