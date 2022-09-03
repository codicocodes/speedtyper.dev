import { IToplistResult } from "../types";

const formatResults = (results: any[]) => {
  const formattedResults: IToplistResult[] = results.map((result: any) => ({
    challengeName: result.challenge.name,
    projectName: result.challenge.project,
    type: result.challenge.type,
    cpm: result.stats.totalCpm,
    accuracy: result.stats.accuracy,
    username: result.user[0].username,
    avatarUrl: result.user[0].avatarUrl,
    time: result.time,
    totalSeconds: result.stats.totalSeconds,
  }));

  return formattedResults;
};

export default formatResults;
