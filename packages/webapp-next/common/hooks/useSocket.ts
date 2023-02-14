import { useEffect, useMemo } from "react";
import SocketLatest from "../services/Socket";
import { getExperimentalServerUrl } from "../utils/getServerUrl";

export function useSocket(): SocketLatest {
  return useMemo(() => {
    const serverUrl = getExperimentalServerUrl();
    return new SocketLatest(serverUrl);
  }, []);
}

export function useCleanupSocket(socket: SocketLatest) {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);
}
