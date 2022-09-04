import ky from "ky-universal";
import { useEffect, useState } from "react";
import { IToplistResult } from "../../types/";

export default (challengeId:  string | null):  IToplistResult[] => {
  const { serverUrl } = process.env

  const [topChallengeResults, setTopChallengeResults] = useState([]);

  useEffect(() => {
    if (challengeId) {
      ky.get(`${serverUrl}/challenges/${challengeId}/results/top`)
      .json()
      .then(( results: IToplistResult[] ) => {
        setTopChallengeResults(results);
      })
    }
  }, [challengeId]);

  return topChallengeResults;
};
