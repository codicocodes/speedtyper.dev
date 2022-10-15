import { getExperimentalServerUrl } from "../utils/getServerUrl";

const USER_API = "/api/user";

export const fetchUser = async (cookie?: string) => {
  const serverUrl = getExperimentalServerUrl();
  const url = serverUrl + USER_API;
  return fetch(url, {
    credentials: "include",
    headers: cookie ? { cookie } : undefined,
  }).then((res) => res.json());
};
