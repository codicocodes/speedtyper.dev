import ky from "ky-universal";
import getConfig from "next/config";
import { useEffect, useState } from "react";
import { IToplistResult } from "../types/";

const useTopResult = (challengeId: string | null): IToplistResult[] => {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();

  const [topChallengeResults, setTopChallengeResults] = useState<
    IToplistResult[]
  >([]);

  useEffect(() => {
    if (challengeId) {
      ky.get(`${serverUrl}/challenges/${challengeId}/results/top`)
        .json()
        .then((results: unknown) => {
          setTopChallengeResults(results as IToplistResult[]);
        });
    }
  }, [challengeId, serverUrl]);

  return topChallengeResults;
};
export default useTopResult;
