/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import useUserResults from "../../hooks/useUserResults";
import SecondChart from "../../components/SecondChart";
import { useRouter } from "next/router";
import { GithubLogo } from "../../assets/icons";
import { toHumanReadableTime } from "../../common/utils/toHumanReadableTime";
import Image from "next/image";

interface ProfileProps {
  userName?: string;
}

const ProfileItem = ({
  children,
}: {
  children: React.ReactNode;
  customWidth?: string;
}) => {
  return (
    <div className="flex md:flex-row flex-col md:items-center md:justify-around justify-center bg-dark-lake text-off-white p-5 gap-10 mb-4 rounded-xl shadow-lg w-full">
      {children}
    </div>
  );
};

export type ResultSelectorType = "monthly" | "annual";

const ProfilePage = (props: ProfileProps) => {
  const router = useRouter();
  const { username } = router.query;

  // TODO: handle Nextjs query being of type string | string[] | undefined
  const userResults = useUserResults(username);

  const [resultSelector, setResulSelector] = useState(
    "monthly" as ResultSelectorType
  );

  if (!userResults) {
    return null;
  }

  const challengeResults = userResults[resultSelector];

  return userResults ? (
    <div className="flex text-off-white items-center justify-center h-full w-full tracking-wider mt-10">
      <div className="flex items-center flex-col w-full max-w-5xl">
        <div className="flex flex-wrap items-center w-full">
          <ProfileItem>
            <>
              <div className="flex gap-5 items-center">
                <div>
                  <Image
                    width="60px"
                    height="60px"
                    src={userResults.avatarUrl}
                    alt={challengeResults.username}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={userResults.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center font-bold"
                    title="github.com"
                  >
                    <GithubLogo />
                    <h1 className="ml-1">{username}</h1>
                  </a>
                  <h4>
                    Joined{" "}
                    {new Date(userResults.createdAt).toDateString().slice(4)}
                  </h4>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-bold">Games Played</h3>
                <h4 className="text-3xl font-bold">
                  {userResults.gamesPlayed}
                </h4>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-bold">Time Played</h3>
                <h4 className="text-3xl font-bold">
                  {" "}
                  {toHumanReadableTime(userResults.totalSecondsPlayed)}
                </h4>
              </div>
            </>
          </ProfileItem>
        </div>
        <div className="max-w-5xl w-full bg-dark-lake items-center pt-2 text-lg text-off-white font-light rounded-md text-white">
          <div className="flex flex-row">
            <h2 className="text-xl px-8 py-4 font-bold">Progress (WPM)</h2>
            <div className="flex-grow"></div>
            <button
              className={`font-bold my-4 outline-none border-none ${
                resultSelector === "monthly"
                  ? "text-purple-200"
                  : "text-off-white"
              }`}
              style={{
                outline: "none",
              }}
              onClick={() => setResulSelector("monthly")}
            >
              30 days
            </button>
            <button
              className={`font-bold m-4 mr-8 ${
                resultSelector === "annual"
                  ? "text-purple-200"
                  : "text-off-white"
              }`}
              style={{
                outline: "none",
              }}
              onClick={() => setResulSelector("annual")}
            >
              12 months
            </button>
          </div>
          <SecondChart
            challengeResults={challengeResults}
            resultSelector={resultSelector}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfilePage;
