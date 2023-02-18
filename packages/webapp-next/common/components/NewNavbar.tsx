import { AnimatePresence, motion } from "framer-motion";
import getConfig from "next/config";
import Link from "next/link";
import { TerminalIcon } from "../../assets/icons/TerminalIcon";
import Navbar, { Logo, WebsiteName } from "../../components/Navbar";
import { LeaderboardButton } from "../../modules/play2/components/leaderboard/LeaderboardButton";
import { useGameStore } from "../../modules/play2/state/game-store";
import { useIsPlaying } from "../hooks/useIsPlaying";
import Button from "./Button";
import { NewGithubLoginModal } from "./modals/GithubLoginModal";

export const navbarFactory = () => {
  const {
    publicRuntimeConfig: { isProduction },
  } = getConfig();
  return isProduction ? Navbar : NewNavbar;
};

const HomeLink = () => {
  return (
    <Link href="/">
      <span className="flex items-center cursor-pointer trailing-widest leading-normal text-xl  pl-2 text-off-white hover:text-white mr-2 lg:mr-6">
        <div className="flex items-center mr-4 mb-1">
          <Logo />
        </div>
        <WebsiteName />
      </span>
    </Link>
  );
};

const ProfileSection = () => {
  const isPlaying = useIsPlaying();
  return (
    <>
      {!isPlaying && (
        <AnimatePresence>
          <motion.div
            className="flex-grow flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm flex-grow"></div>
            <NewGithubLoginModal />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export const NewNavbar = () => {
  const isPlaying = useIsPlaying();
  return (
    <header
      className="mt-2 h-10 tracking-tighter"
      style={{
        fontFamily: "Fira Code",
      }}
    >
      <div className="w-full">
        <div className="flex items-center items-start py-2">
          <HomeLink />
          {!isPlaying && (
            <>
              <Link href="/play2">
                <Button
                  size="sm"
                  color="invisible"
                  onClick={() => useGameStore.getState().game?.play()}
                  leftIcon={<TerminalIcon />}
                />
              </Link>
              <LeaderboardButton />
            </>
          )}
          <ProfileSection />
        </div>
      </div>
    </header>
  );
};
