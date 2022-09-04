import React from "react";
import { IAction } from "../../types";
import cpmToWpm from "../utils/cpmToWpm";
export const toHHMMSS = (secs: number) => {
  const minutes = Math.floor(secs / 60) % 60;
  const seconds = secs % 60;

  let result = "";

  result = minutes ? result.concat(`${minutes} m, `) : result;

  result = result.concat(`${seconds} s`);

  return result;
};

const ResultItem = ({
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

export default ({
  progress,
  combo,
  totalSeconds,
  trailingCpm,
  totalCpm,
  maxCombo,
  mistakeCount,
  accuracy,
  isCompleted,
}: {
  progress: number;
  combo: number;
  maxCombo: number;
  trailingCpm: number;
  totalCpm: number;
  mistakeCount: number;
  accuracy: number;
  isCompleted: boolean;
  totalSeconds: number;
  dispatch: React.Dispatch<IAction>;
}) => {
  const wpm = cpmToWpm(isCompleted ? totalCpm : trailingCpm);

  return (
    <>
      <div className="flex flex-wrap flex-grow items-center">
        <ResultItem>
          <div className="flex flex-row flex-grow justify-around items-center p-4">
            <p className="text-xl font-bold">Time</p>
            <p className="text-2xl text-purple-300 font-bold">
              {toHHMMSS(totalSeconds)}
            </p>
          </div>
        </ResultItem>
        <ResultItem>
          <div className="flex flex-row flex-grow justify-around items-center p-4">
            <p className="text-xl font-bold">WPM</p>
            <p className="text-2xl text-purple-300 font-bold">{wpm}</p>
          </div>
        </ResultItem>
        {!isCompleted && (
          <ResultItem>
            <div className="flex flex-row flex-grow justify-around items-center p-4">
              <p className="text-xl font-bold">Combo</p>
              <p className="text-2xl text-purple-300 font-bold">{combo}</p>
            </div>
          </ResultItem>
        )}
        {isCompleted && (
          <>
            <ResultItem>
              <div className="flex flex-row flex-grow justify-around items-center p-4">
                <p className="text-xl font-bold">Max Combo</p>
                <p className="text-2xl text-purple-300 font-bold">{maxCombo}</p>
              </div>
            </ResultItem>

            <ResultItem>
              <div className="flex flex-row flex-grow justify-around items-center p-4">
                <p className="text-xl font-bold">Accuracy</p>
                <p className="text-2xl text-purple-300 font-bold">
                  {accuracy}%
                </p>
              </div>
            </ResultItem>

            <ResultItem>
              <div className="flex flex-row flex-grow justify-around items-center p-4">
                <p className="text-xl font-bold">Mistakes</p>
                <p className="text-2xl text-purple-300 font-bold">
                  {mistakeCount}
                </p>
              </div>
            </ResultItem>
          </>
        )}
        {!isCompleted && (
          <ResultItem>
            <div className="flex flex-row flex-grow justify-around items-center p-4">
              <p className="text-xl font-bold">Progress</p>
              <p className="text-2xl text-purple-300 font-bold">{progress}%</p>
            </div>
          </ResultItem>
        )}
      </div>
    </>
  );
};
