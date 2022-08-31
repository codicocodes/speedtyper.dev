import { useEffect, useState } from "react";
import { useSiteData } from "react-static";
import ky from "ky-universal";
import { IToplistResult } from "../../types/";

export default () => {
  const { serverUrl } = useSiteData();
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
