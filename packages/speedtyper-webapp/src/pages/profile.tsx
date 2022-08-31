import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import useUserResults from "../hooks/useUserResults";
import { humanizeRelative, humanizeAbsolute } from "../utils/humanize";
import SecondChart from "../components/SecondChart";

interface ProfileProps extends RouteComponentProps {
  userName?: string;
}

const ProfileItem = ({
  children,
}: {
  children: React.ReactChild;
  customWidth?: string;
}) => {
  return (
    <div className="flex items-center justify-between bg-dark-lake text-off-white p-2 mr-6 mb-4 w-56 rounded-xl shadow-lg">
      {children}
    </div>
  );
};
export type ResultSelectorType = "monthly" | "annual";
export default (props: ProfileProps) => {
  const { userName } = props;

  const userResults = useUserResults(userName);

  const [resultSelector, setResulSelector] = useState(
    "monthly" as ResultSelectorType
  );

  if (!userResults) {
    return null;
  }

  const challengeResults = userResults[resultSelector];

  return userResults ? (
    <div className="flex text-off-white justify-center  h-full w-full mt-12 tracking-wider">
      <div className="flex w-full items-center flex-col">
        <div className="flex flex-wrap flex-grow items-center">
          <ProfileItem>
            <div className="p-4 flex-row">
              <div className="pb-2 text-sm">Username:</div>
              <div className="text-xl">{userName}</div>
            </div>
          </ProfileItem>
          <ProfileItem>
            <div className="p-4 flex-row">
              <div className="pb-2 text-sm">Member for:</div>
              <div className="text-xl">
                {humanizeAbsolute(new Date(userResults.createdAt))}
              </div>
            </div>
          </ProfileItem>
          <ProfileItem>
            <div className="p-4 flex-row">
              <div className="pb-2 text-sm">Time played:</div>
              <div className="text-xl">
                {humanizeRelative(userResults.totalSecondsPlayed * 1000)}
              </div>
            </div>
          </ProfileItem>
          <ProfileItem>
            <div className="p-4 flex-row">
              <div className="pb-2 text-sm">Games played:</div>
              <div className="text-xl">{userResults.gamesPlayed}</div>
            </div>
          </ProfileItem>
        </div>
        <div className="max-w-5xl w-full flex-grow bg-dark-lake items-center mt-4 pt-2 text-lg text-off-white font-light rounded-md text-white">
          <div className="flex flex-row">
            <h1 className="text-xl px-8 py-4 font-bold">Progress (WPM)</h1>
            <div className="text-sm flex-grow"></div>
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
