import getConfig from "next/config";
import { useEffect, useState } from "react";
import { YoutubeLogo } from "../../../assets/icons/YoutubeLogo";

export const useHasClicked = (key: string, value: string): boolean => {
  const [hasClicked, setHasClicked] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      setHasClicked(storedValue === value);
    }
  }, [key, value]);
  return hasClicked;
};

const YOUTUBE_LINK_STORAGE_KEY = "youtube-link";
export const YoutubeLink = () => {
  const [hasClickedNow, setHasClickedNow] = useState(false);
  const youtubeLink = "https://www.youtube.com/watch?v=pNsJS5F-2yg";
  const hasClickedPreviously = useHasClicked(
    YOUTUBE_LINK_STORAGE_KEY,
    youtubeLink
  );

  const color =
    hasClickedPreviously || hasClickedNow ? "text-faded-gray" : "text-red-500";

  return (
    <a
      href={youtubeLink}
      className={`flex items-center ${color} hover:text-red-500`}
      target="blank"
      onClick={() => {
        localStorage.setItem(YOUTUBE_LINK_STORAGE_KEY, youtubeLink);
        setHasClickedNow(true);
      }}
      onMouseDown={(event: any) => {
        if (event.button === 1) {
          localStorage.setItem(YOUTUBE_LINK_STORAGE_KEY, youtubeLink);
          setHasClickedNow(true);
        }
      }}
    >
      <div className="h-6 w-6 flex items-center">
        <YoutubeLogo />
      </div>
      <span className="ml-1">watch</span>
    </a>
  );
};
