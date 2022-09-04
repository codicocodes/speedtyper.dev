import { useState, useEffect } from "react";
import { IAction } from "../../types";

import challengeData from "../data/challenge";
import processCode from "../utils/processCode";

export default (dispatch: React.Dispatch<IAction>) => {
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    // TODO here we will get data from the server later, right now we are formatting the code from a file
    const { chars, code: strippedCode, index: startIndex } = processCode(
      challengeData.fullCodeString
    );

    const builtChallengeData = {
      ...challengeData,
      startIndex,
      chars,
      strippedCode,
    };

    setChallenge(builtChallengeData);

    dispatch({ type: "challenge_loaded", payload: builtChallengeData });
  }, []);

  return challenge;
};
