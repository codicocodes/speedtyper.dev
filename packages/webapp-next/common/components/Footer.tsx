import { AnimatePresence, motion } from "framer-motion";
import { DiscordLogo, GithubLogo, TwitchLogo } from "../../assets/icons";
import { useIsPlaying } from "../hooks/useIsPlaying";
import Button from "./Button";

export function Footer() {
  const isPlaying = useIsPlaying();
  return (
    <footer className="relative">
      {!isPlaying && (
        <div className="absolute bottom-0 w-full bg-dark-ocean">
          <AnimatePresence>
            <motion.div
              className="flex items-center text-off-white"
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
                  leftIcon={<GithubLogo />}
                />
              </a>
              <a href="https://discord.gg/AMbnnN5eep" target="blank">
                <Button
                  color="invisible"
                  size="sm"
                  title="Join Discord"
                  leftIcon={<DiscordLogo />}
                />
              </a>
              <a href="https://twitch.tv/codico" target="blank">
                <Button
                  color="invisible"
                  size="sm"
                  title="Watch livestreams"
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
