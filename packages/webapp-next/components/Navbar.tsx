import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import AvatarModal from "./AvatarModal";
import { useAppContext } from "../AppContext";
import { IUser } from "../types";
import Link from "next/link";
import Button from "./Button";

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

const DiscordLogo = () => {
  return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 245 240"
            >
              <path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" />
              <path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" />
            </svg>
  )
}

const TwitchLogo = () => {
  return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.857 0L1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429l-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
              <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
            </svg>
  )
}

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
        <div className="flex-grow flex items-center">
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
