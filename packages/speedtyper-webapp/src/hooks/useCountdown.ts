import { useState, useEffect } from "react";

export default (queueTimeMs?: number): number | null => {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const timers = [];
    if (queueTimeMs) {
      const seconds = Math.floor(queueTimeMs / 1000);

      for (let i = seconds; i >= 0; i--) {
        timers.push(
          setTimeout(() => {
            setCountdown(seconds - i);
          }, i * 1000)
        );
      }
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [queueTimeMs]);

  return countdown;
};
