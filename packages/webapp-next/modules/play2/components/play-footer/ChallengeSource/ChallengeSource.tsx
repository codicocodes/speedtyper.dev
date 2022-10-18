import React from "react";
import Link from "next/link";

export interface ChallengeSourceProps {
  url: string;
  name: string;
  license: string;
}

export const ChallengeSource: React.FC<ChallengeSourceProps> = (props) => {
  const { url, name, license } = props;

  return (
    <Link href={url} passHref>
      <a target={"_blank"} className={"text-2xl"}>
        {name} ({license})
      </a>
    </Link>
  );
};
