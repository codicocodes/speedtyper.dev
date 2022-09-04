import { useEffect, useState } from "react";
import ky from "ky-universal";
import getConfig from "next/config";

const useUserResult = (userName: string): any => {
  const { publicRuntimeConfig: { serverUrl } } = getConfig()
  const [userResults, setUserResults] = useState(null);

  useEffect(() => {
    ky.get(`${serverUrl}/users/${userName}/results`, { credentials: "include" })
      .json()
      .then((userData) => {
        setUserResults(userData as any);
      });
  }, []);

  return userResults;
};

export default useUserResult
