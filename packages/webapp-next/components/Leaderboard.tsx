import Link from "next/link";
import React from "react";
import { IToplistResult } from "../types";
import cpmToWpm from "../utils/cpmToWpm";
import { humanizeAbsolute } from "../utils/humanize";
import Image from "next/image";

const LargeHeader = () => {
  return (
    <tr className="hidden lg:block">
      <th className="border-l-8 border-transparent px-2 pl-4 text-left">#</th>
      <th className="px-2 pl-4 text-left" style={{ width: "25px" }}></th>
      <th className="px-2 pl-4 text-left" style={{ width: "350px" }}>
        User
      </th>
      <th className="w-32 mr-8 text-left">Speed</th>
      <th className="w-32 mr-8 text-left">Accuracy</th>
      <th className="w-auto text-left">Time ago</th>
    </tr>
  );
};

const SmallHeader = () => {
  return (
    <tr className="block lg:hidden w-full">
      <th className="text-left" style={{ width: "155px" }}>
        User
      </th>
      <th className="text-left" style={{ width: "25px" }}>
        Speed
      </th>
    </tr>
  );
};

const LargeContent = ({ results }: { results: any }) => {
  return (
    <tbody className="hidden lg:block">
      {results.map((result: any, i: number) => {
        return (
          <tr className="font-mono" key={i}>
            <td
              className={`border-l-8  ${
                result.isCurrentResult
                  ? "border-purple-400"
                  : "border-transparent"
              } p-2 pl-4`}
              style={{ width: "25px" }}
            >
              {i + 1}
            </td>
            <td>
              <Image
                className="rounded-full"
                width="25px"
                height="25px"
                quality={100}
                src={result.avatarUrl}
              />
            </td>
            <td
              style={{
                height: "auto",
                width: "350px",
                textAlign: "left",
                maxWidth: "350px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              className="pl-4"
            >
              <Link
                className="hover:text-purple-300"
                href={`/profile/${result.username}`}
              >
                {result.username}
              </Link>
            </td>
            <td className="w-32 mr-8">{cpmToWpm(result.cpm)} wpm</td>
            <td className="w-32 mr-8">{result.accuracy}%</td>
            <td className="w-auto">
              {humanizeAbsolute(new Date(result.time))} ago
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const SmallContent = ({ results }: { results: any }) => {
  return (
    <tbody className="block lg:hidden">
      {results.map((result: any, i: number) => {
        return (
          <tr className="font-mono" key={i}>
            <td
              style={{
                height: "auto",
                width: "155px",
                textAlign: "left",
                maxWidth: "155px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <Link
                className="hover:text-purple-300"
                href={`/profile/${result.username}`}
              >
                {result.username}
              </Link>
            </td>
            <td className="">{cpmToWpm(result.cpm)} wpm</td>
          </tr>
        );
      })}
    </tbody>
  );
};

const Leaderboard = ({
  results,
}: {
  results: IToplistResult[];
}): JSX.Element => {
  return (
    <table
      className="m-2"
      style={{
        borderCollapse: "separate",
        borderSpacing: "1em 0",
      }}
    >
      <thead className="">
        <tr className=" px-4 pb-4">
          <th
            className="border-l-8 pl-4 border-transparent text-left"
            style={{ columnSpan: "all", paddingBottom: "10px" }}
            colSpan={3}
          >
            Recent Highscores
          </th>
        </tr>
        <LargeHeader />
        <SmallHeader />
      </thead>
      <LargeContent results={results} />
      <SmallContent results={results} />
    </table>
  );
};

export default Leaderboard;
