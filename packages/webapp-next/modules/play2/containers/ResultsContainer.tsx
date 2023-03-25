import {
  faArrowDown,
  faArrowTrendUp,
  faArrowUp,
  faSquarePollHorizontal,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cpmToWPM } from "../../../common/utils/cpmToWPM";
import { toHumanReadableTime } from "../../../common/utils/toHumanReadableTime";
import ResultsChart from "../components/ResultsChart";
import { useGameStore } from "../state/game-store";
import { useTrendStore } from "../state/trends-store";

function ResultsText({ title, value }: { title: string; value: string }) {
  return (
    <div className="h-full flex flex-col justify-end px-2 min-w-[120px] bg-dark-lake rounded p-1">
      <p className="flex justify-start color-inherit font-bold text-off-white text-xs">
        {title}
      </p>
      <div className="flex items-center gap-2 text-faded-gray justify-between">
        <p className="font-bold text-2xl">{value}</p>
      </div>
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
      <div className="w-full flex flex-row gap-4 justify-between mb-2">
        <div className="flex flex-col gap-1">
          <h3 className="px-2 flex color-inherit font-bold text-faded-gray text-sm items-center gap-2">
            <FontAwesomeIcon
              className="h-5 w-5 flex items-center justify-center"
              icon={faSquarePollVertical}
            />
            result
          </h3>
          <div className="flex gap-2">
            <ResultsText title="wpm" value={wpm.toString()} />
            <ResultsText title="accuracy" value={`${accuracy}%`} />
            <ResultsText title="time" value={time} />
            <ResultsText title="mistakes" value={mistakesCount.toString()} />
          </div>
        </div>
        {!result.user.isAnonymous ? <TrendsWPM currWPM={wpm} /> : null}
      </div>
      <ResultsChart />
    </div>
  );
}

function TrendsWPM({ currWPM }: { currWPM: number }) {
  const { threeGameWPM, tenGameWPM, todayWPM } = useTrendStore();
  const noResults = !threeGameWPM && !tenGameWPM && !todayWPM;
  if (noResults) {
    return null;
  }
  return (
    <div className="flex flex-col justify-end gap-1">
      <h3 className="px-2 flex color-inherit font-bold text-faded-gray text-sm items-center gap-2">
        <FontAwesomeIcon
          className="h-5 w-5 flex items-center justify-center"
          icon={faArrowTrendUp}
        />
        trends wpm
      </h3>
      <div className="flex gap-2">
        {threeGameWPM ? (
          <HistoryicalResult
            title={"3 games"}
            currWPM={currWPM}
            wpm={threeGameWPM}
          />
        ) : null}
        {tenGameWPM ? (
          <HistoryicalResult
            title={"10 games"}
            currWPM={currWPM}
            wpm={tenGameWPM}
          />
        ) : null}
        {todayWPM ? (
          <HistoryicalResult title={"today"} currWPM={currWPM} wpm={todayWPM} />
        ) : null}
      </div>
    </div>
  );
}

function HistoryicalResult({
  title,
  currWPM,
  wpm,
}: {
  title: string;
  currWPM: number;
  wpm: number;
}) {
  const percentageChange = (currWPM / wpm) * 100 - 100;
  return (
    <div className="h-full flex flex-col justify-end px-2 min-w-[120px] bg-dark-lake rounded p-1">
      <p className="flex justify-start color-inherit font-bold text-off-white text-xs">
        {title}
      </p>
      <div className="flex items-center gap-2 text-faded-gray justify-between">
        <p className="font-bold text-2xl">{wpm}</p>
        <div className="font-bold text-xs flex items-center gap-1">
          {percentageChange > 0 ? (
            <div className="h-2 w-2 text-green-500">
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          ) : (
            <div className="h-2 w-2 text-red-500">
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          )}
          {Math.abs(percentageChange).toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
