import { cpmToWPM } from "../../../common/utils/cpmToWPM";
import { toHumanReadableTime } from "../../../common/utils/toHumanReadableTime";
import ResultsChart from "../components/ResultsChart";
import { useCodeStore } from "../state/code-store";
import { Game } from "../services/Game";
import { useKeyMap } from "../../../hooks/useKeyMap";

export interface ResultsContainerProps {
  game: Game;
}

function ResultsText({ title, value }: { title: string; value: string }) {
  return (
    <div className="m-2">
      <p className="color-inherit font-bold text-faded-gray">{title}</p>
      <p className="font-bold text-5xl text-purple-300">{value}</p>
    </div>
  );
}

export function ResultsContainer({ game }: ResultsContainerProps) {
  const cpm = useCodeStore((state) => state.getCPM)();
  const wpm = cpmToWPM(cpm);
  const ms = useCodeStore((state) => state.getTimeMS)();
  const time = toHumanReadableTime(Math.floor(ms / 1000));
  const mistakesCount = useCodeStore((state) => state.getMistakesCount)();
  const accuracy = useCodeStore((state) => state.getAccuracy)();

  useKeyMap(true, "Tab", () => game.next());

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
