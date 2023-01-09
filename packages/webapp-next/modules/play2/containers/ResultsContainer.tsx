import { cpmToWPM } from "../../../common/utils/cpmToWPM";
import { toHumanReadableTime } from "../../../common/utils/toHumanReadableTime";
import ResultsChart from "../components/ResultsChart";
import { useCodeStore } from "../state/code-store";
import { useGameStore } from "../state/game-store";

function ResultsText({ title, value }: { title: string; value: string }) {
  return (
    <div className="m-2">
      <p className="color-inherit font-bold text-faded-gray">{title}</p>
      <p className="font-bold text-5xl text-purple-300">{value}</p>
    </div>
  );
}

export function ResultsContainer() {
  const result = useGameStore((state) => state.myResult);
  // TODO: Show loading indicator here
  if (!result) return null;
  const cpm = result.cpm;
  const wpm = cpmToWPM(cpm);
  const ms = result.timeMS;
  const time = toHumanReadableTime(Math.floor(ms / 1000));
  const mistakesCount = result.mistakes;
  const accuracy = result.accuracy;
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row gap-4">
        <ResultsText title="wpm" value={wpm.toString()} />
        <ResultsText title="accuracy" value={`${accuracy}%`} />
        <ResultsText title="time" value={time} />
        <ResultsText title="mistakes" value={mistakesCount.toString()} />
      </div>
      <ResultsChart />
    </div>
  );
}
