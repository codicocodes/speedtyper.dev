import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DiscordLogo, GithubLogo, TwitchLogo } from "../../assets/icons";
import { getStargazersCount } from "../github/stargazers";
import { useIsPlaying } from "../hooks/useIsPlaying";
import Button from "./Button";

function useStargazersCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    getStargazersCount().then((stargazersCount) => {
      setCount(stargazersCount);
    });
  }, []);
  return count;
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
              className="flex items-center justify-center text-off-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a
                href="https://github.com/codicocodes/speedtyper.dev"
                target="blank"
              >
                <Button
                  color="invisible"
                  size="sm"
                  title="Star on GitHub"
                  text={`${stargazersCount} stars`}
                  leftIcon={<GithubLogo />}
                />
              </a>
              <a href="https://discord.gg/AMbnnN5eep" target="blank">
                <Button
                  color="invisible"
                  size="sm"
                  title="Join Discord"
                  text="join"
                  leftIcon={<DiscordLogo />}
                />
              </a>
              <a href="https://twitch.tv/codico" target="blank">
                <Button
                  color="invisible"
                  size="sm"
                  title="Watch livestreams"
                  text="watch"
                  leftIcon={<TwitchLogo />}
                />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </footer>
  );
}
