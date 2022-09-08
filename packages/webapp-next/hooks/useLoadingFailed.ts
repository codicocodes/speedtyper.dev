import { useEffect, useState } from "react";

export default (socket: any) => {
  const [loadingFailed, setLoadingFailed] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.subscribe("race_joined_failed", (error: string) => {
        if (error) return;
        setLoadingFailed(true);
      });
    }
  }, [socket]);

  return loadingFailed;
};
