import Link from "next/link";
import React from "react";
import { IToplistResult } from "../../types";
import cpmToWpm from "../utils/cpmToWpm";
import { toHHMMSS } from "./Timer";

export default ({ results }: { results: IToplistResult[] }): JSX.Element => {
  return (
    <table
      className="m-2 font-mono"
      style={{
        borderCollapse: "separate",
        borderSpacing: "1em 0",
      }}
    >
      <thead className="font-mono">
        <tr className="font-mono px-4 pb-4">
          <th
            className="border-l-8 border-transparent px-2 pl-4 text-left"
            style={{ columnSpan: "all", paddingBottom: "10px" }}
            colSpan={3}
          >
            Race Results
          </th>
        </tr>
        <tr>
          <th
            className="border-l-8 border-transparent px-2 pl-4 text-left"
            style={{ width: "25px" }}
          >
            #
          </th>
          <th className="px-2 pl-4 text-left" style={{ width: "25px" }}></th>
          <th className="px-2 pl-4 text-left" style={{ width: "350px" }}>
            User
          </th>
          <th className="w-32 mr-8 text-left" style={{ width: "25px" }}>
            Speed
          </th>
          <th className="w-32 mr-8 text-left">Accuracy</th>
          <th className="w-32 text-left">Time</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, i) => {
          return (
            <tr key={i}>
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

              <td className="">
                <img
                  className="rounded-full"
                  style={{ width: "25px" }}
                  src={result.avatarUrl}
                />
              </td>
              <td
                style={{
                  height: "auto",
                  width: "350px",
                  display: "block",
                  textAlign: "left",
                  maxWidth: "350px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                className="p-2 pl-4"
              >
                {!result.guest ? (
                  <Link
                    className="hover:text-purple-300"
                    to={`/profile/${result.username}`}
                  >
                    {result.username}
                  </Link>
                ) : (
                  result.username
                )}
              </td>
              <td className="w-32 mr-8">{cpmToWpm(result.cpm)} wpm</td>
              <td className="w-32 mr-8">{result.accuracy}%</td>
              <td className="w-auto">{toHHMMSS(result.totalSeconds)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
