import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import AvatarModal from "./AvatarModal";
import { useAppContext } from "../AppContext";
import { IUser } from "../types";
import Link from "next/link";
import Button from "../common/components/Button";
import { TwitchLogo, DiscordLogo } from "../assets/icons";
import Image from "next/image";
import { useIsPlaying } from "../common/hooks/useIsPlaying";

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
    <header>
      <div className="flex items-center align-center py-2 px-2 sm:px-2 lg:px-40 xl:px-40 lg:py-4 relative">
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
  return isPlaying ? null : (
    <div className="flex-grow flex items-center gap-4">
      <div className="text-sm flex-grow"></div>
      {userIsGuest && <LoginModal />}
      {isUserLoggedIn && <AvatarModal user={user} logout={logout} />}
      <a href="https://discord.gg/AMbnnN5eep" target="blank">
        <Button
          color="primary"
          leftIcon={<DiscordLogo />}
          size="sm"
          title="Join the discord"
          text="Join"
        />
      </a>
      <a href="https://twitch.tv/codico" target="blank">
        <Button
          color="primary"
          size="sm"
          leftIcon={<TwitchLogo />}
          title="Follow codico on twitch"
          text="Follow"
        />
      </a>
    </div>
  );
};

export default Navbar;
