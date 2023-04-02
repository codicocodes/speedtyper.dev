import { useMemo } from "react";
import { useIsPlaying } from "../common/hooks/useIsPlaying";

export const Stream = () => {
  const isPlaying = useIsPlaying();
  const isLive = false;
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
    <div
      className={`${
        isPlaying ? "hidden" : "absolute"
      } bottom-0 right-0 mr-8 mb-8`}
    >
      <div id="twitch-embed" />
    </div>
  );
};
