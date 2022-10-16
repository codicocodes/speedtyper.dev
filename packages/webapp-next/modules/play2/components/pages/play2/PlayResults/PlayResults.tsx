/*
| Filename : PlayResults.tsx
| Author : Calixte DE TOURRIS (Discord: Ovoda#3529)
*/

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCodeStore } from "../../../../state/code-store";
import { cpmToWPM } from "../../../../../../common/utils/cpmToWPM";
import { toHumanReadableTime } from "../../../../../../common/utils/toHumanReadableTime";
import ResultsChart from "../../../ResultsChart";

/*
|--------------------------------------------------------------------------
| Contracts
|--------------------------------------------------------------------------
*/
export interface PlayResultsProps {}

interface PlayResultsTextProps {
  title: string;
  value: string;
}

/*
|--------------------------------------------------------------------------
| Sub Component
|--------------------------------------------------------------------------
*/
const ResultsText = ({ title, value }: PlayResultsTextProps) => {
  // Render
  //--------------------------------------------------------------------------
  return (
    <div className="m-2">
      <p className="color-inherit font-bold text-faded-gray">{title}</p>
      <p className="font-bold text-5xl text-purple-300">{value}</p>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/
export const PlayResults: React.FC<PlayResultsProps> = () => {
  const cpm = useCodeStore((state) => state.getCPM)();
  const ms = useCodeStore((state) => state.getTimeMS)();
  const mistakesCount = useCodeStore((state) => state.getMistakesCount)();
  const accuracy = useCodeStore((state) => state.getAccuracy)();
  const wpm = React.useMemo(() => cpmToWPM(cpm), [cpm]);
  const time = React.useMemo(
    () => toHumanReadableTime(Math.floor(ms / 1000)),
    [ms]
  );

  // Render
  //--------------------------------------------------------------------------
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full m-2"
      >
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row gap-4">
            <ResultsText title="wpm" value={wpm.toString()} />
            <ResultsText title="accuracy" value={`${accuracy}%`} />
            <ResultsText title="time" value={time} />
            <ResultsText title="mistakes" value={mistakesCount.toString()} />
          </div>
          <ResultsChart />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
