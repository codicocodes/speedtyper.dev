/*
| Filename : PlayerFooterChallengeInfo.tsx
| Author : Calixte DE TOURRIS (Discord: Ovoda#3529)
*/

import React from "react";
import Link from "next/link";
import { GithubLogo } from "../../../../../../../assets/icons";

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface PlayerFooterChallengeInfoProps {
  name: string;
  url: string;
  licence: string;
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const PlayerFooterChallengeInfo: React.FC<
  PlayerFooterChallengeInfoProps
> = (props) => {
  const { name, url, licence } = props;
  return (
    <React.Fragment>
      <Link href={url} passHref>
        <a target={"_blank"}>
          <div className={"flex items-center gap-1 text-faded-gray"}>
            <GithubLogo />
            <h4
              className={
                "text-faded-gray text-lg cursor-pointer whitespace-nowrap"
              }
            >
              {name} ({licence})
            </h4>
          </div>
        </a>
      </Link>
    </React.Fragment>
  );
};
