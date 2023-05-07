import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface TweetResultProps {
  wpm: number;
  url: string;
}

export const TweetResult = ({ wpm, url }: TweetResultProps) => {
  let tweetText = `Checkout this typing game for programmers. Can you beat ${wpm} wpm?`;
  let tweetUrl = `https://twitter.com/intent/tweet?url=${url}&text=${tweetText}&via=codicocodes`;
  return (
    <a
      href={tweetUrl}
      target="blank"
      className="w-full sm:w-auto flex shadow-lg hover:shadow-violet-900 hover:cursor-pointer text-faded-gray hover:text-off-white bg-dark-lake flex-col items-center justify-center px-1 rounded hover:bg-white/10"
    >
      <div className="h-4 w-4">
        <FontAwesomeIcon icon={faTwitter as IconDefinition} />
      </div>
    </a>
  );
};
