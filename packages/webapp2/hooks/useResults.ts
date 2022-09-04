import { useEffect, useState } from "react";
import ky from "ky-universal";
import { IToplistResult } from "../../types/";

export default () => {
  const serverUrl = process.env.serverUrl
  const [dailyResults, setDailyResults] = useState([] as IToplistResult[]);

  console.log({serverUrl})

  useEffect(() => {
    ky.get(`${serverUrl}/leaderboards/daily`)
      .json()
      .then((results) => {
        setDailyResults(results as IToplistResult[]);
      });
  }, []);

  return dailyResults;
};
