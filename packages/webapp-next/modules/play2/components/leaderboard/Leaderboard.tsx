import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { GithubLogo } from "../../../../assets/icons";
import { CrownIcon } from "../../../../assets/icons/CrownIcon";
import { cpmToWPM } from "../../../../common/utils/cpmToWPM";
import { getExperimentalServerUrl } from "../../../../common/utils/getServerUrl";
import { humanizeAbsolute } from "../../../../utils/humanize";

export const Leaderboard: React.FC = () => {
  const baseUrl = getExperimentalServerUrl();
  const [selectedLeaderboard, setSelectedLeaderboard] =
    useState<Leaderboards>("wpm");

  const [activityData, setActivityData] = useState<any[]>([]);
  const { data, isLoading } = useSWR(
    baseUrl + "/api/results/leaderboard",
    (...args) => fetch(...args).then((res) => res.json()),
    { refreshInterval: 15000 }
  );

  useEffect(() => {
    if (data) {
      const newData = [...data];
      newData.sort((a, b) => b.racesPlayed - a.racesPlayed);
      setActivityData(newData);
    }
  }, [data]);
  return (
    <div
      className="flex flex-col bg-off-white text-dark-ocean p-5 rounded gap-4 w-full max-h-screen overflow-y-scroll"
      style={{ fontFamily: "Fira Code" }}
    >
      <div className="flex justify-between">
        <h2 className="text-2xl tracking-widest font-thin">
          Daily Leaderboard
        </h2>
        <LeaderboardSelector
          selectedLeaderboard={selectedLeaderboard}
          setSelectedLeaderboard={setSelectedLeaderboard}
        />
      </div>
      <div className="flex">
        {selectedLeaderboard === "wpm" && (
          <WPMLeaderboard results={data} isLoading={isLoading} />
        )}
        {selectedLeaderboard === "activity" && (
          <ActivityLeaderboard results={activityData} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export const ActivityLeaderboard = ({
  isLoading,
  results,
}: WPMLeaderboardProps) => {
  return (
    <>
      {!isLoading && results && (
        <div className="tracking-wider font-thin">
          <LeaderboardRowActivity
            placement="#"
            user="user"
            racesPlayed="Races played"
          />
          {results.map((r: any, i: number) => {
            const placement = i === 0 ? <CrownIcon /> : i + 1;
            const userNode = (
              <div className="flex items-center">
                <Image
                  className="rounded-full"
                  width="30"
                  height="30"
                  quality={100}
                  src={r.avatarUrl}
                  alt={r.username}
                />
                <span className="ml-2" title={r.username}>
                  {r.username}
                </span>
                <Link href={`https://github.com/${r.username}`}>
                  <a target="_blank" className="ml-1">
                    <GithubLogo />
                  </a>
                </Link>
              </div>
            );

            return (
              <LeaderboardRowActivity
                key={i}
                placement={placement}
                user={userNode}
                racesPlayed={r.racesPlayed}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

interface WPMLeaderboardProps {
  isLoading: boolean;
  results: any[];
}

export const WPMLeaderboard = ({ isLoading, results }: WPMLeaderboardProps) => {
  return (
    <>
      {!isLoading && results && (
        <div className="tracking-wider font-thin">
          <LeaderboardRowWPM
            placement="#"
            user="user"
            speed="speed (wpm)"
            accuracy="accuracy"
            timeAgo="time ago"
          />
          {results.map((r: any, i: number) => {
            const placement = i === 0 ? <CrownIcon /> : i + 1;
            const userNode = (
              <div className="flex items-center">
                <Image
                  className="rounded-full"
                  width="30"
                  height="30"
                  quality={100}
                  src={r.avatarUrl}
                  alt={r.username}
                />
                <span className="ml-2" title={r.username}>
                  {r.username}
                </span>
                <Link href={`https://github.com/${r.username}`}>
                  <a target="_blank" className="ml-1">
                    <GithubLogo />
                  </a>
                </Link>
              </div>
            );

            return (
              <LeaderboardRowWPM
                key={i}
                placement={placement}
                user={userNode}
                speed={cpmToWPM(r.cpm).toString()}
                accuracy={r.accuracy + "%"}
                timeAgo={humanizeAbsolute(new Date(r.createdAt))}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

interface LeaderboardRowWPMProps {
  placement: React.ReactNode;
  user: React.ReactNode;
  speed: string;
  accuracy: string;
  timeAgo: string;
}

export const LeaderboardRowWPM: React.FC<LeaderboardRowWPMProps> = (props) => {
  return (
    <div
      className={`flex items-center justify-start gap-8 p-1 px-2 my-1 first:font-bold even:bg-gray-200 rounded`}
    >
      <span className="ml-2 w-[25px]">{props.placement}</span>
      <div className="w-[300px] w-full truncate">{props.user}</div>
      <span className="w-[125px]">{props.speed}</span>
      <span className="w-[125px]">{props.accuracy}</span>
      <span className="mr-2 w-[125px]">{props.timeAgo}</span>
    </div>
  );
};

interface LeaderboardRowActivityProps {
  placement: React.ReactNode;
  user: React.ReactNode;
  racesPlayed: string;
}

export const LeaderboardRowActivity: React.FC<LeaderboardRowActivityProps> = (
  props
) => {
  return (
    <div
      className={`flex items-center justify-start gap-8 p-1 px-2 my-1 first:font-bold even:bg-gray-200 rounded`}
    >
      <span className="ml-2 w-[25px]">{props.placement}</span>
      <div className="w-[300px] w-full truncate">{props.user}</div>
      <span className="w-[125px]"></span>
      <span className="w-[100px]"></span>
      <span className="mr-2 w-[150px]">{props.racesPlayed}</span>
    </div>
  );
};

type Leaderboards = "wpm" | "activity";

interface LeaderboardSelectorProps {
  selectedLeaderboard: Leaderboards;
  setSelectedLeaderboard: (board: Leaderboards) => void;
}

export const LeaderboardSelector = ({
  selectedLeaderboard,
  setSelectedLeaderboard,
}: LeaderboardSelectorProps) => {
  return (
    <RadioGroup value={selectedLeaderboard} onChange={setSelectedLeaderboard}>
      <div className="flex w-full font-bold tracking-widest gap-1">
        <RadioGroup.Option
          className="w-full cursor-pointer min-w-[150px]"
          value="wpm"
        >
          {({ checked }) => (
            <div
              className={`flex items-center h-full w-full p-3 rounded-lg ${
                checked
                  ? "bg-purple-200 hover:bg-purple-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <span>wpm</span>
            </div>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option
          className="w-full cursor-pointer min-w-[150px]"
          value="activity"
        >
          {({ checked }) => (
            <div
              className={`flex items-center h-full w-full p-3 rounded-lg ${
                checked
                  ? "bg-purple-200 hover:bg-purple-300"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              activity
            </div>
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
};
