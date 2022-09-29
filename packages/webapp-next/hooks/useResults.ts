import { useEffect, useState } from "react";
import ky from "ky-universal";
import { IToplistResult } from "../types/";
import getConfig from "next/config";

const useResults = () => {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  const [dailyResults, setDailyResults] = useState([] as IToplistResult[]);

  useEffect(() => {
    ky.get(`${serverUrl}/leaderboards/daily`)
      .json()
      .then((results) => {
        setDailyResults(results as IToplistResult[]);
      });
  }, []);

  return dailyResults;
};
export default useResults;
