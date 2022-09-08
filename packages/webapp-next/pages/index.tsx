import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Toplist from "../components/Leaderboard";
import useResults from "../hooks/useResults";
import Stream from "../components/Stream";
import { useAppContext } from "../AppContext";
import MarketingBar from "../components/MarketingBar";
import Link from "next/link";
import getConfig from "next/config";

const IndexPage = () => {
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  const dailyResults = useResults();
  const { user } = useAppContext();
  return (
    <>
      <div className="text-off-white justify-center align-center h-full w-full tracking-wider bg-dark-ocean">
        <div className="flex justify-center items-center mt-4">
          <img style={{ width: "125px", height: "auto" }} src="/logo.png" />
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
              <div className="flex flex-row items-center">
                <div className="hidden md:inline-block justify-center text-xl px-12 py-2 mt-4 mx-12 mb-6 text-dark-ocean hover:bg-gray-100 bg-off-white shadow rounded items-center flex-grow-0">
                  <Link href="/play">
                    <a className="flex justify-center items-center">
                      Enter a typing race
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 fill-current ml-2"
                      >
                        <path d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"></path>
                      </svg>
                    </a>
                  </Link>
                </div>
                <div className="inline-block md:hidden lg:hidden justify-center text-xl px-12 py-2 mt-8 mx-12 mb-6 text-dark-ocean hover:bg-gray-100 bg-off-white shadow lg:rounded items-center flex-grow-0">
                  <div className="flex justify-center items-center">
                    Not available on mobile.
                    <svg viewBox="0 0 24 24" className="h-5 fill-current ml-2">
                      <path d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"></path>
                    </svg>
                  </div>
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

              <div className="hidden md:inline-block font-light justify-center text-xl px-12 py-2 mt-4 mx-12 mb-6 text-dark-ocean  hover:bg-gray-100 bg-off-white shadow rounded items-center flex-grow-0">
                <Link href="/play?mode=private">
                  <a className="flex justify-center items-center">
                    Private game
                    <svg viewBox="0 0 24 24" className="h-5 fill-current ml-2">
                      <path d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"></path>
                    </svg>
                  </a>
                </Link>
              </div>
              <div className="inline-block md:hidden lg:hidden justify-center text-xl px-12 py-2 mt-8 mx-12 mb-6 text-dark-ocean hover:bg-gray-100 bg-off-white shadow lg:rounded items-center flex-grow-0">
                <div className="flex justify-center items-center">
                  Not available on mobile.
                  <svg viewBox="0 0 24 24" className="h-5 fill-current ml-2">
                    <path d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"></path>
                  </svg>
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
            <a
              href="https://discord.gg/AMbnnN5eep"
              target="_blank"
              className="font-light inline-block justify-center text-xl px-12 py-2 mt-4 ml-12 mb-6 text-dark-ocean  hover:bg-gray-100 bg-off-white shadow lg:rounded items-center flex-grow-0"
              rel="noreferrer"
            >
              <div className="flex items-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 245 240"
                >
                  <path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" />
                  <path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z" />
                </svg>
                <p className="pl-1">Join Discord</p>
              </div>
            </a>
            <a
              href="https://github.com/codicocodes/speedtyper.dev"
              target="_blank"
              className="font-light inline-block justify-center text-xl px-12 py-2 mt-4 mx-12 mb-6 text-dark-ocean  hover:bg-gray-100 bg-off-white shadow lg:rounded items-center flex-grow-0"
              rel="noreferrer"
            >
              <div className="flex items-center w-full">
                <svg
                  height="20"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>

                <p className="pl-1">Contribute</p>
              </div>
            </a>
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
              <button
                className="px-8 py-1 border flex items-center px-2 cursor-pointer text-dark-ocean bg-off-white mx-12 mt-4 lg:rounded text-lg"
                onClick={() => {
                  function copyToClipboard(text: string) {
                    navigator.clipboard.writeText(text);
                    toast.dark("Copied to clipboard!");
                  }

                  const markdown = `
[<img src="https://api.speedtyper.dev/users/${user?.username}/badges/averagewpm" alt="SpeedTyper.dev avg wpm" height="25">](https://www.speedtyper.dev/profile/${user?.username}) 
[<img src="https://api.speedtyper.dev/users/${user?.username}/badges/topwpm" alt="SpeedTyper.dev top wpm" height="25">](https://www.speedtyper.dev/profile/${user?.username}) 
[<img src="https://api.speedtyper.dev/users/${user?.username}/badges/gamecount" alt="SpeedTyper.dev games" height="25">](https://www.speedtyper.dev/profile/${user?.username})
`;
                  copyToClipboard(markdown);
                }}
              >
                <svg
                  height="20"
                  viewBox="0 0 128 128"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  id="fi_4469818"
                >
                  <path d="m118.786 23.732a1.893 1.893 0 0 0 -.479-.9l-22.32-22.322a1.811 1.811 0 0 0 -1.237-.51h-41.043a7.759 7.759 0 0 0 -7.75 7.75v10.635h-10.638a7.759 7.759 0 0 0 -7.75 7.75v10.638h-10.638a7.759 7.759 0 0 0 -7.75 7.75v75.724a7.758 7.758 0 0 0 7.75 7.75h57.362a7.759 7.759 0 0 0 7.75-7.75v-10.638h10.638a7.759 7.759 0 0 0 7.75-7.75v-10.638h10.638a7.759 7.759 0 0 0 7.75-7.75v-59.4a1.689 1.689 0 0 0 -.033-.339zm-22.286-17.76 8.172 8.172 8.172 8.172h-16.344zm-17.957 114.275a4.255 4.255 0 0 1 -4.25 4.25h-57.362a4.255 4.255 0 0 1 -4.25-4.25v-75.724a4.255 4.255 0 0 1 4.25-4.25h10.638v67.586a1.75 1.75 0 0 0 1.75 1.75h49.224zm18.388-18.388a4.255 4.255 0 0 1 -4.25 4.25h-61.612v-79.974a4.255 4.255 0 0 1 4.25-4.25h10.638v67.586a1.75 1.75 0 0 0 1.75 1.75h49.224zm14.138-14.138h-61.612v-79.974a4.255 4.255 0 0 1 4.25-4.25h39.293v20.569a1.749 1.749 0 0 0 1.75 1.75h20.569v57.655a4.255 4.255 0 0 1 -4.25 4.25z"></path>
                </svg>
                <p className="pl-2">Copy</p>
              </button>
            </div>
          </div>
        )}
        {dailyResults.length > 0 && (
          <div>
            <div className="flex justify-center">
              <div className="max-w-5xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-4 pt-2 text-lg text-off-white font-light lg:rounded-md">
                <Toplist results={dailyResults} />
              </div>
            </div>
          </div>
        )}
        <div className="hidden lg:block mt-4">
          <Stream />
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default IndexPage;
