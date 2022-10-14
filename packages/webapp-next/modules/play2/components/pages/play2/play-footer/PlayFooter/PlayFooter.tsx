/*
| Filename : PlayFooter.tsx
| Author : Calixte DE TOURRIS (Discord: Ovoda#3529)
*/

import React from "react";
import { PlayFooterActions } from "../PlayerFooterActions";
import { PlayFooterTimer } from "../PlayFooterTimer";
import {
  PlayerFooterChallengeInfo,
  PlayerFooterChallengeInfoProps,
} from "../PlayerFooterChallengeInfo";

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface PlayFooterProps {
  isPlaying: boolean;
  nextChallenge: () => void;
  seconds: number;
  challenge: PlayerFooterChallengeInfoProps;
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const PlayFooter: React.FC<PlayFooterProps> = (props) => {
  const { isPlaying, nextChallenge, seconds, challenge } = props;
  // Render
  //--------------------------------------------------------------------------
  return (
    <div className="flex w-full">
      {isPlaying ? (
        <PlayFooterTimer seconds={seconds} />
      ) : (
        <React.Fragment>
          <PlayFooterActions nextChallenge={nextChallenge} />
          <PlayerFooterChallengeInfo {...challenge} />
        </React.Fragment>
      )}
    </div>
  );
};
