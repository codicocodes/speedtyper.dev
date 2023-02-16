import { useEffect, useMemo } from "react";
import SocketLatest from "../services/Socket";
import { getExperimentalServerUrl } from "../utils/getServerUrl";

export function useSocket(): SocketLatest {
  const serverUrl = getExperimentalServerUrl();
  const socket = useMemo(() => new SocketLatest(serverUrl), [serverUrl]);
  useEffect(() => {
    socket.connect();
  }, [socket]);
  return socket;
}

export function useCleanupSocket(socket: SocketLatest) {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);
}
