import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Toplist from "../components/Leaderboard";
import useResults from "../hooks/useResults";
import Stream from "../components/Stream";
import { useAppContext } from "../AppContext";
import Link from "next/link";
import getConfig from "next/config";
import Button from "../common/components/Button";
import {
  DiscordLogo,
  RightArrowIcon,
  CopyIcon,
  GithubLogo,
} from "../assets/icons";
import Image from "next/image";

const IndexPage = () => {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  const dailyResults = useResults();
  const { user } = useAppContext();

  return (
    <>
      <div className="text-off-white justify-center align-center h-full mt-12 w-full tracking-wider bg-dark-ocean">
        <div className="flex justify-center items-center mt-4">
          <div className="relative" style={{ width: "125px", height: "66px" }}>
            <Image layout="fill" src="/logo.png" alt="logo" quality={100} />
          </div>
        </div>
        <h1 className="flex justify-center text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl mb-4 text-center mt-4">
          Typing competitions for programmers
        </h1>
        <div className="flex  justify-center mt-8">
          <div className="flex flex-col lg:flex-row max-w-5xl">
            <div className="lg:mr-2 max-w-5xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-4 pt-2 text-lg text-off-white font-light rounded-md">
              <h2 className="flex font-bold justify-start text-3xl mt-4 mx-12 mb-0 ">
                Join a typing race
              </h2>

              <span className="flex justify-start items-center mt-4 mx-12 mb-0 text-xl">
                SpeedTyper.dev is a type racing application for programmers.
                Battle against other developers by typing challenges from real
                open source projects as fast as possible.
              </span>
              <div className="flex flex-row items-center mx-12 mb-6 mt-4">
                <Link href="/play">
                  <a className="hidden md:inline-block">
                    <Button
                      color="primary"
                      rightIcon={<RightArrowIcon />}
                      title="Enter a new typing race"
                      text="Enter a typing race"
                      size="lg"
                    />
                  </a>
                </Link>
                <div className="inline-block md:hidden justify-center items-center">
                  <Button
                    color="primary"
                    disabled={true}
                    rightIcon={<RightArrowIcon />}
                    title="Not available on mobile."
                    text="Not available on mobile."
                    size="lg"
                  />
                </div>
              </div>
            </div>
            <div className="lg:ml-2 w-full flex-grow bg-dark-lake shadow-2xl items-center mt-4 pt-2 text-lg text-off-white font-light rounded-md">
              <h2 className="flex font-bold justify-start text-3xl mt-4 mx-12 mb-0">
                Create a custom game
              </h2>
              <span className="flex justify-start items-center mt-4 mx-12 mb-0 text-xl">
                Improve your typing speed when programming by practicing alone
                or battle it out with your friends in a private typing game.
              </span>

              <div className="flex flex-row items-center mx-12 mb-6 mt-4">
                <Link href="/play?mode=private">
                  <a className="hidden md:inline-block">
                    <Button
                      color="primary"
                      rightIcon={<RightArrowIcon />}
                      title="Create a private game"
                      text="Private Game"
                      size="lg"
                    />
                  </a>
                </Link>
                <div className="inline-block md:hidden justify-center items-center">
                  <Button
                    color="primary"
                    disabled={true}
                    rightIcon={<RightArrowIcon />}
                    title="Not available on mobile."
                    text="Not available on mobile."
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="max-w-5xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-4 pt-2 text-lg text-off-white font-light lg:rounded-md">
            <h2 className="flex font-bold justify-start text-2xl mt-4 mx-12 mb-0 ">
              Join the community
            </h2>
            <div className="flex justify-start items-center mt-4 mx-12 mb-0 text-xl">
              Join a small but growing community of typers and developers to
              keep up to date with tournaments, live streams and updates to the
              game.
            </div>
            <div className="flex flex-col lg:flex-row items-start mx-12 mb-6 mt-4 gap-6 lg:gap-12">
              <a
                href="https://discord.gg/AMbnnN5eep"
                target="_blank"
                className="inline-block justify-center"
                rel="noreferrer"
              >
                <Button
                  color="primary"
                  leftIcon={<DiscordLogo />}
                  title="Join the discord"
                  text="Join Discord"
                  size="lg"
                />
              </a>
              <a
                href="https://github.com/codicocodes/speedtyper.dev"
                target="_blank"
                className="inline-block justify-center"
                rel="noreferrer"
              >
                <Button
                  color="primary"
                  leftIcon={<GithubLogo />}
                  title="Contribute to code"
                  text="Contribute"
                  size="lg"
                />
              </a>
            </div>
          </div>
        </div>

        {user?.guest !== true && user?.username && (
          <div className="flex justify-center mt-4">
            <div className="max-w-5xl w-full flex-grow bg-dark-lake shadow-2xl items-center text-lg text-off-white font-light lg:rounded-md py-8">
              <h2 className="flex font-bold justify-start mx-12">
                Flex your results on GitHub
              </h2>
              <div className="flex flex-col lg:flex-row flex-grow mx-12 my-2">
                {["averagewpm", "topwpm", "gamecount"].map((badge, i) => {
                  return (
                    <img
                      key={i}
                      className="pr-4 h-6 my-2 lg:my-0"
                      style={{ width: "240px" }}
                      src={`${serverUrl}/users/${user?.username}/badges/${badge}`}
                    />
                  );
                })}
              </div>
              <div className="mx-12 mt-4">
                <Button
                  color="primary"
                  leftIcon={<CopyIcon />}
                  title="Copy to clipboard"
                  text="Copy"
                  onClick={() => {
                    function copyToClipboard(text: string) {
                      navigator.clipboard.writeText(text);
                      toast.dark("Copied to clipboard!");
                    }

                    const markdown = `
[<img src="${serverUrl}/users/${user?.username}/badges/averagewpm" alt="SpeedTyper.dev avg wpm" height="25">](https://www.speedtyper.dev/profile/${user?.username}) 
[<img src="${serverUrl}/users/${user?.username}/badges/topwpm" alt="SpeedTyper.dev top wpm" height="25">](https://www.speedtyper.dev/profile/${user?.username}) 
[<img src="${serverUrl}/users/${user?.username}/badges/gamecount" alt="SpeedTyper.dev games" height="25">](https://www.speedtyper.dev/profile/${user?.username})
`;
                    copyToClipboard(markdown);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {dailyResults.length > 0 && (
          <div>
            <div className="flex justify-center">
              <div className="max-w-5xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-4 pt-2 text-lg text-off-white font-light lg:rounded-md mb-8">
                <Toplist results={dailyResults} />
              </div>
            </div>
          </div>
        )}
        <div className="hidden lg:block">
          <Stream />
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default IndexPage;
