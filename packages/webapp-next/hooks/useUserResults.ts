import { useEffect, useState } from "react";
import ky from "ky-universal";
import getConfig from "next/config";

const useUserResult = (username: string | string[] | undefined): any => {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  const [userResults, setUserResults] = useState(null);

  useEffect(() => {
    if (Array.isArray(username) || !username) {
      setUserResults(null);
      return;
    }
    ky.get(`${serverUrl}/users/${username}/results`, { credentials: "include" })
      .json()
      .then((userData) => {
        setUserResults(userData as any);
      })
      .catch(() => {
        setUserResults(null);
      });
  }, [serverUrl, username]);

  return userResults;
};

export default useUserResult;
