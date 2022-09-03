import ChallengeEvent from "../models/challengeEvents";
import Challenge from "../models/challenge";

export type onChallengeStartedArgs = {
  challengeId: string;
  referrer?: string;
};

export default async function onChallengeStarted(data: onChallengeStartedArgs) {
  const { challengeId, referrer } = data;

  const challenge = await Challenge.findById(challengeId);

  if (!challenge) {
    return null;
  }

  const challengeName = challenge.name;

  const challengeEvent = new ChallengeEvent({
    challenge: challengeName,
    event: "challenge_started",
    referrer,
  });

  return challengeEvent.save();
}
