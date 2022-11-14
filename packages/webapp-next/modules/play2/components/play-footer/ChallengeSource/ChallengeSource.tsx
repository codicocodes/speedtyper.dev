import React, { useEffect } from "react";
import Link from "next/link";
import { GithubLogo } from "../../../../../assets/icons";
import { useUserStore } from "../../../../../common/state/user-store";

export interface ChallengeSourceProps {
  url: string;
  name: string;
  license: string;
}

export const ChallengeSource: React.FC<ChallengeSourceProps> = (props) => {
  const { url, name, license } = props;

  return (
    <Link href={url} passHref>
      <a target="_blank" className="flex items-center text-lg font-medium">
        <div className="mr-1">
          <GithubLogo />
        </div>{" "}
        {name} ({license})
      </a>
    </Link>
  );
};
