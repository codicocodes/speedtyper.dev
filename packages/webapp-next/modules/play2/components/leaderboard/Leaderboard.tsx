import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { CrownIcon } from "../../../../assets/icons/CrownIcon";
import { cpmToWPM } from "../../../../common/utils/cpmToWPM";
import { getExperimentalServerUrl } from "../../../../common/utils/getServerUrl";
import { humanizeAbsolute } from "../../../../utils/humanize";

export const Leaderboard: React.FC = () => {
  const baseUrl = getExperimentalServerUrl();
  const { data, isLoading } = useSWR(
    baseUrl + "/api/results/leaderboard",
    (...args) => fetch(...args).then((res) => res.json()),
    { refreshInterval: 15000 }
  );
  return (
    <div
      className="flex flex-col w-full bg-off-white text-dark-ocean p-5 rounded gap-4 w-full"
      style={{ fontFamily: "Fira Code" }}
    >
      <h2 className="text-2xl tracking-widest font-thin">Daily Leaderboard</h2>

      {!isLoading && data && (
        <div className="tracking-wider font-thin">
          <LeaderboardRow
            placement="#"
            user="user"
            userPopover="User"
            speed="speed (wpm)"
            accuracy="accuracy"
            timeAgo="time ago"
          />
          {(data as any[]).map((r: any, i: number) => {
            const placement = i === 0 ? <CrownIcon /> : i + 1;
            const userNode = (
              <div className="flex items-center">
                <Image
                  className="cursor-pointer rounded-full"
                  width="30"
                  height="30"
                  quality={100}
                  src={r.avatarUrl}
                  alt={r.username}
                />
                <span className="ml-2 font-extrabold tracking-wider text-sm">
                  {r.username}
                </span>
              </div>
            );

            return (
              <LeaderboardRow
                key={i}
                placement={placement}
                user={userNode}
                userPopover={r.username}
                speed={cpmToWPM(r.cpm).toString()}
                accuracy={r.accuracy + "%"}
                timeAgo={humanizeAbsolute(new Date(r.createdAt))}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

interface LeaderboardRowProps {
  placement: React.ReactNode;
  user: React.ReactNode;
  userPopover: string;
  speed: string;
  accuracy: string;
  timeAgo: string;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = (props) => {
  return (
    <div
      className={`flex items-center justify-start gap-8 p-1 px-2 my-1 first:font-bold even:bg-gray-200 rounded `}
    >
      <span className="ml-2 w-[25px]">{props.placement}</span>
      <div className="w-[300px] w-full truncate" title={props.userPopover}>
        {props.user}
      </div>
      <span className="w-[125px]">{props.speed}</span>
      <span className="w-[100px]">{props.accuracy}</span>
      <span className="mr-2 w-[100px]">{props.timeAgo}</span>
    </div>
  );
};
