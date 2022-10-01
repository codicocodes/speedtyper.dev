import React from "react";
import { IChallenge } from "../types";
import Button from "../common/components/Button";
import { GithubLogo } from "../assets/icons";

const ChallengeInfo = ({ challenge }: { challenge: IChallenge }) => {
  return (
    <div className="flex flex-wrap flex-row text-dark-ocean text-sm my-4 gap-4">
      <Button
        color="secondary"
        leftIcon={<GithubLogo />}
        onClick={() => {
          window.open(challenge?.source, "_blank");
        }}
        title="See Code"
        text={challenge?.name}
      />
      <Button
        color="secondary"
        leftIcon={<GithubLogo />}
        onClick={() => {
          window.open(challenge?.projectUrl, "_blank");
        }}
        title="See Project"
        text={challenge?.project}
      />
      <Button
        color="secondary"
        leftIcon={<GithubLogo />}
        onClick={() => {
          window.open(challenge?.licenseUrl, "_blank");
        }}
        title="See License"
        text={challenge?.license}
      />
    </div>
  );
};

export default ChallengeInfo;
