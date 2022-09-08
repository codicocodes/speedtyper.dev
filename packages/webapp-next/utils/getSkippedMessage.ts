import { IChallenge } from "../types/";

export default (challenge: IChallenge) => {
  return challenge
    ? `// The code is from ${challenge.project} and is licensed under the ${challenge.license} license.

`
    : "";
};
