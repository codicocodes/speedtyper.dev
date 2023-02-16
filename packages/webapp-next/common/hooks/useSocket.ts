import { useEffect } from "react";
import { useConnectionStore } from "../../modules/play2/state/connection-store";
import SocketLatest from "../services/Socket";
import { getExperimentalServerUrl } from "../utils/getServerUrl";

export function useSocket() {
  useEffect(() => {
    const serverUrl = getExperimentalServerUrl();
    const socket = new SocketLatest(serverUrl);
    useConnectionStore.setState((s) => ({ ...s, socket }));
  }, []);
}

export function useCleanupSocket() {
  useEffect(() => {
    return () => {
      useConnectionStore.getState().socket?.disconnect();
    };
  }, []);
}
