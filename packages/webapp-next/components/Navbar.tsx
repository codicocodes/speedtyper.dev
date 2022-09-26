import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import AvatarModal from "./AvatarModal";
import { useAppContext } from "../AppContext";
import { IUser } from "../types";
import Link from "next/link";
import Button from "./Button";
import { TwitchLogo, DiscordLogo } from "../assets/icons";

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
  const { user, logout } = useAppContext();
  const websiteName = "speedtyper";
  const userIsGuest = useIsGuest(user);
  return (
    <header>
      <div className="flex items-center align-center py-2 px-2 sm:px-2 lg:px-40 xl:px-40 lg:py-4 relative">
        <Link href="/">
          <span className="flex items-center cursor-pointer trailing-widest leading-normal text-xl  pl-2 text-off-white hover:text-white mr-2 lg:mr-6">
            <img
              className="mr-4 mb-1"
              style={{ width: "45px", height: "auto", maxHeight: "22px" }}
              src="../logo.png"
            />
            <h2 className="hidden sm:block whitespace-no-wrap font-bold">
              {websiteName}
            </h2>
          </span>
        </Link>
        <div className="flex-grow flex items-center gap-4">
          <div className="text-sm flex-grow"></div>
          {userIsGuest && <LoginModal />}
          {userIsGuest === false && logout && (
            <AvatarModal user={user} logout={logout} />
          )}
          <a
            href="https://discord.gg/AMbnnN5eep"
            target="blank"
            >
          <Button
            color="primary"
            leftIcon={<DiscordLogo />}
            title="Join the discord"
            text="Join"
          />
          </a>
          <a
            href="https://twitch.tv/codico"
            target="blank"
            >
          <Button
            color="primary"
            leftIcon={<TwitchLogo />}
            title="Follow codico on twitch"
            text="Follow"
          />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
