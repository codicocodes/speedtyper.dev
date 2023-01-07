import { getExperimentalServerUrl } from "../utils/getServerUrl";

const RESULT_API = "/api/results";

export const saveResult = async (data: any) => {
  const serverUrl = getExperimentalServerUrl();
  const url = serverUrl + RESULT_API;
  return fetch(url, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(data),
  }).then((resp) => resp.json());
};
