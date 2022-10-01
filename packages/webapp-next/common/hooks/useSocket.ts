import { useMemo } from "react";
import Socket from "../../Socket";
import { getServerUrl } from "../utils/getServerUrl";

export function useSocket() {
  return useMemo(() => {
    const serverUrl = getServerUrl();
    return new Socket(serverUrl);
  }, []);
}
