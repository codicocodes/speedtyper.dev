import React, { useEffect } from "react";

const Stream = () => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      try {
        const script = document.createElement("script");
        script.setAttribute("src", "https://embed.twitch.tv/embed/v1.js");
        script.addEventListener("load", () => {
          // @ts-ignore
          new window.Twitch.Embed("twitch-embed", {
            width: "940",
            height: "480",
            muted: true,
            channel: "codico",
          });
        });
        document.body.appendChild(script);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <div className="flex justify-center items-center mb-4 lg:w-5xl">
      <div className="max-w-5xl flex flex-col justify-center items-center">
        <div
          className="flex justify-center max-w-4xl"
          id={"twitch-embed"}
        ></div>
      </div>
    </div>
  );
};

export default Stream;
