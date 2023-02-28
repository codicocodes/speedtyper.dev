import { toast } from "react-toastify";
import { cpmToWPM } from "../../../common/utils/cpmToWPM";
import { toHumanReadableTime } from "../../../common/utils/toHumanReadableTime";
import { ActionButton } from "../components/play-footer/PlayFooter";
import ResultsChart from "../components/ResultsChart";
import { useGameStore } from "../state/game-store";

function ResultsText({ title, value }: { title: string; value: string }) {
  return (
    <div className="m-2">
      <p className="color-inherit font-bold text-faded-gray">{title}</p>
      <p className="font-bold text-5xl text-purple-300">{value}</p>
    </div>
  );
}

export function ResultsInfo() {
  const result = useGameStore((state) => state.myResult);
  if (!result) return null;
  const cpm = result.cpm;
  const wpm = cpmToWPM(cpm);
  const ms = result.timeMS;
  const time = toHumanReadableTime(Math.floor(ms / 1000));
  const mistakesCount = result.mistakes;
  const accuracy = result.accuracy;
  return (
    <div className="flex gap-4">
      <ResultsText title="wpm" value={wpm.toString()} />
      <ResultsText title="accuracy" value={`${accuracy}%`} />
      <ResultsText title="time" value={time} />
      <ResultsText title="mistakes" value={mistakesCount.toString()} />
    </div>
  );
}

export function ResultsContainer() {
  const result = useGameStore((state) => state.myResult);
  // TODO: Show loading indicator here
  if (!result) return null;
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-end justify-between mb-2">
        <ResultsInfo />
        <ActionButton
          text={"share"}
          onClick={() => {
            console.log(result.id);
            toast.dark("Copied to clipboard!");
          }}
          icon={
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-4"
              >
                <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
              </svg>
            </div>
          }
        />
      </div>
      <ResultsChart />
    </div>
  );
}
