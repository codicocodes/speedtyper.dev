import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DiscordLogo, GithubLogo, TwitchLogo } from "../../assets/icons";
import { getStargazersCount } from "../github/stargazers";
import { useIsPlaying } from "../hooks/useIsPlaying";
import { PlayingNow } from "./BattleMatcher";
import { YoutubeLink } from "./Footer/YoutubeLink";

function useStargazersCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    getStargazersCount().then((stargazersCount) => {
      setCount(stargazersCount);
    });
  }, []);
  return count;
}

export function KeybindInfo() {
  return (
    <div className="flex flex-grow items-center">
      <PlayingNow />
    </div>
  );
}

export function Footer() {
  const isPlaying = useIsPlaying();
  const stargazersCount = useStargazersCount();
  return (
    <footer
      className="h-10 tracking-tighter"
      style={{
        fontFamily: "Fira Code",
      }}
    >
      {!isPlaying && (
        <div className="w-full bg-dark-ocean">
          <AnimatePresence>
            <motion.div
              className="flex items-center justify-center text-faded-gray"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-grow items-center mb-2 text-xs">
                <h1 className="bg-dark-lake py-1 px-2 rounded font-bold text-faded-gray">
                  Tab
                </h1>
                <span className="mx-1 text-faded-gray">Refresh challenge</span>
                <h1 className="bg-dark-lake py-1 px-2 rounded font-bold ml-2 text-faded-gray">
                  Enter
                </h1>

                <span className="mx-1 text-faded-gray">Start race</span>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/codicocodes/speedtyper.dev"
                  className="flex items-center hover:text-off-white"
                  target="blank"
                >
                  <GithubLogo />
                  <span className="ml-1">{stargazersCount} stars</span>
                </a>
                <a
                  href="https://discord.gg/AMbnnN5eep"
                  className="flex items-center hover:text-blue-300"
                  target="blank"
                >
                  <DiscordLogo />
                  <span className="ml-1">join</span>
                </a>
                <a
                  href="https://twitch.tv/codico"
                  className="flex items-center hover:text-purple-400"
                  target="blank"
                >
                  <TwitchLogo />
                  <span className="ml-1">live</span>
                </a>
                <YoutubeLink />
                <a
                  href="https://dotfyle.com"
                  className="flex items-center hover:text-emerald-500 gap-1"
                  target="blank"
                >
                  <div className="h-5 w-5 flex items-center">
                    <FontAwesomeIcon icon={faCode} size="2x" color="fill" />
                  </div>
                  <span className="ml-1">nvim</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </footer>
  );
}
