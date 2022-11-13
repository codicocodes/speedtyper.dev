import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import AvatarModal from "./AvatarModal";
import { useAppContext } from "../AppContext";
import { IUser } from "../types";
import Link from "next/link";
import Image from "next/image";
import { useIsPlaying } from "../common/hooks/useIsPlaying";
import { AnimatePresence, motion } from "framer-motion";
// TODO: should not be able to be both null and undefined
// Maybe we should consider putting isGuest on the user object
// on the server
const useIsGuest = (user: IUser | null | undefined): boolean => {
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    if (user === null) {
      setIsGuest(true);
    } else {
      setIsGuest(!!user?.guest);
    }
  }, [user]);

  return isGuest;
};

const Navbar = () => {
  return (
    <header className="relative">
      <div className="absolute w-full">
        <div className="flex items-start py-2">
          <Link href="/">
            <span className="flex items-center cursor-pointer trailing-widest leading-normal text-xl  pl-2 text-off-white hover:text-white mr-2 lg:mr-6">
              <div className="flex items-center mr-4 mb-1">
                <Logo />
              </div>
              <WebsiteName />
            </span>
          </Link>
          <NavBarButtons />
        </div>
      </div>
    </header>
  );
};

const WebsiteName = () => {
  const isPlaying = useIsPlaying();
  const websiteName = "speedtyper";
  const colorClass = isPlaying ? "text-faded-gray" : "text-inherit";
  return (
    <h2
      className={`hidden sm:block whitespace-no-wrap font-bold ${colorClass}`}
    >
      {websiteName}
    </h2>
  );
};

const Logo = () => {
  const isPlaying = useIsPlaying();
  return isPlaying ? (
    <Image
      width="45px"
      height="25px"
      src="/faded-logo.png"
      quality={100}
      alt="speedtyper logo"
    />
  ) : (
    <Image
      width="45px"
      height="25px"
      src="/logo.png"
      quality={100}
      alt="speedtyper logo"
    />
  );
};

const NavBarButtons = () => {
  const { user, logout } = useAppContext();
  const userIsGuest = useIsGuest(user);
  const isUserLoggedIn = !userIsGuest && user && logout;
  const isPlaying = useIsPlaying();
  return (
    <>
      {!isPlaying && (
        <AnimatePresence>
          <motion.div
            className="flex-grow flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm flex-grow"></div>
            {userIsGuest && <LoginModal />}
            {isUserLoggedIn && <AvatarModal user={user} logout={logout} />}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Navbar;
