import { getExperimentalServerUrl } from "../utils/getServerUrl";

const RACE_STATUS_API = "/api/races/:id/status";

export const fetchRaceStatus = async (raceId: string) => {
  const serverUrl = getExperimentalServerUrl();
  const url = serverUrl + RACE_STATUS_API.replace(":id", raceId);
  return fetch(url, {
    credentials: "include",
  }).then((resp) => resp.json());
};
