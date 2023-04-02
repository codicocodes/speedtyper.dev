import { faChevronUp, faCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { useIsPlaying } from "../common/hooks/useIsPlaying";

export const Stream = () => {
  const isPlaying = useIsPlaying();
  const isLive = false;
  const [isHidden, setIsHidden] = useState(false);
  useMemo(() => {
    if (isLive && typeof document !== "undefined") {
      try {
        const script = document.createElement("script");
        script.setAttribute("src", "https://embed.twitch.tv/embed/v1.js");
        script.addEventListener("load", () => {
          // @ts-ignore
          new window.Twitch.Embed("twitch-embed", {
            width: "340",
            height: "200",
            layout: "video",
            muted: true,
            channel: "codico",
          });
        });
        document.body.appendChild(script);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLive]);
  return (
    <>
      <div
        className={`${
          isPlaying ? "hidden" : ""
        } bottom-0 right-0 mr-8 mb-8 absolute`}
      >
        <div className={`${!isLive || isPlaying || isHidden ? "hidden" : ""}`}>
          <div className="flex text-red-400 items-center gap-2 font-semibold justify-between">
            <div className="flex items-center gap-2 m-2">
              <div className="h-3 w-3 flex items-center">
                <FontAwesomeIcon icon={faCircle} />
              </div>
              live now
            </div>
            <button
              onClick={() => setIsHidden(true)}
              className="flex gap-2 items-center text-gray-400 hover:text-gray-200 hover:cursor-pointer font-normal"
            >
              hide
              <div className="h-2 w-2 flex items-center">
                <FontAwesomeIcon icon={faX} />
              </div>
            </button>
          </div>
          <div id="twitch-embed" />
        </div>
        {isHidden && (
          <button
            className="flex gap-2 items-center text-gray-400 hover:text-gray-200 hover:cursor-pointer font-normal"
            onClick={() => setIsHidden(false)}
          >
            <div className="h-2 w-2 flex items-center">
              <FontAwesomeIcon icon={faChevronUp} />
            </div>
            show stream
          </button>
        )}
      </div>
    </>
  );
};
