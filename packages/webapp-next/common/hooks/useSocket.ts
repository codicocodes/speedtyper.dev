import { useMemo } from "react";
import SocketLatest from "../services/Socket";
import { getExperimentalServerUrl } from "../utils/getServerUrl";

export function useSocket() {
  return useMemo(() => {
    const serverUrl = getExperimentalServerUrl();
    return new SocketLatest(serverUrl);
  }, []);
}
