import { getExperimentalServerUrl } from "../utils/getServerUrl";

const serverUrl = getExperimentalServerUrl();

const RACE_STATUS_API = "/api/races/:id/status";

export const fetchRaceStatus = async (raceId: string) => {
  const url = serverUrl + RACE_STATUS_API.replace(":id", raceId);
  return fetch(url, {
    credentials: "include",
  }).then((resp) => resp.json());
};

export const ONLINE_COUNT_API = serverUrl + "/api/races/online";

export const fetchOnlineCount = async () => {
  return fetch(ONLINE_COUNT_API, {
    credentials: "include",
  }).then((resp) => resp.json());
};
