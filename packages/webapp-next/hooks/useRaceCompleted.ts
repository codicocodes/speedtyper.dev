import { useEffect, useState, useRef } from "react";
import { IToplistResult } from "../types";

export default (socket: any, challengeId: string): any[] => {
  const [raceResults, setRaceResults] = useState([] as IToplistResult[]);

  const ref = useRef(raceResults);

  useEffect(() => {
    setRaceResults([]);
  }, [challengeId]);

  useEffect(() => {
    ref.current = raceResults;
  }, [raceResults]);

  const handleRaceCompleted = (error: string, payload: IToplistResult) => {
    if (error) {
      console.log("race_completed_error", error);
      return;
    }
    setRaceResults([...ref.current, payload]);
  };
  useEffect(() => {
    if (socket) {
      socket.subscribe(
        "race_completed",
        (error: string, payload: IToplistResult) => {
          handleRaceCompleted(error, payload);
        }
      );
    }
  }, [socket]);

  return raceResults;
};
