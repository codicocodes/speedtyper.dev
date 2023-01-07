import { AnimatePresence, motion } from "framer-motion";
import getConfig from "next/config";
import Link from "next/link";
import Navbar, { Logo, WebsiteName } from "../../components/Navbar";
import { useIsPlaying } from "../hooks/useIsPlaying";
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
  return (
    <header className="h-10">
      <div className="w-full">
        <div className="flex items-start py-2">
          <HomeLink />
          <ProfileSection />
        </div>
      </div>
    </header>
  );
};
