import { AnimatePresence, motion } from "framer-motion";
import { CrownIcon } from "../../../../../assets/icons/CrownIcon";
import { toHumanReadableTime } from "../../../../../common/utils/toHumanReadableTime";
import cpmToWpm from "../../../../../utils/cpmToWpm";
import {
  RacePlayer,
  RaceResult,
  useGameStore,
  useIsMultiplayer,
} from "../../../state/game-store";

export function ResultsContainer() {
  const isMultiplayer = useIsMultiplayer();
  const results = useGameStore((state) => state.results);
  return isMultiplayer ? (
    <div className="my-1">
      {Object.values(results).map((result, i) => {
        const place = i + 1;
        return <Result key={i} result={result} place={place} />;
      })}
    </div>
  ) : null;
}

export function ProgressContainer() {
  const isMultiplayer = useIsMultiplayer();
  const members = useGameStore((state) => state.members);
  return isMultiplayer ? (
    <div className="my-2">
      {Object.values(members).map((player) => {
        return <ProgressBar key={player.id} player={player} />;
      })}
    </div>
  ) : null;
}

interface ResultProps {
  result: RaceResult;
  place: number;
}

export function Result({ result, place }: ResultProps) {
  return (
    <div className="flex row w-full items-center bg-dark-lake rounded-lg px-3 py-2 my-2">
      <span className="flex w-48 ml-1 mr-4 text-sm font-semibold truncate">
        {result.user.username}
      </span>
      <div className="flex w-full gap-2">
        <span className="flex font-semibold text-xs rounded-lg px-2 py-1 bg-purple-300 text-dark-ocean">
          {place} place
        </span>
        <div className="flex flex-grow justify-end gap-2">
          <span className="font-semibold text-xs rounded-lg px-2 py-1 bg-gray-700">
            {cpmToWpm(result.cpm)} wpm
          </span>
          <span className="font-semibold text-xs rounded-lg px-2 py-1 bg-gray-700">
            {result.accuracy}% accuracy
          </span>
          <span className="font-semibold text-xs rounded-lg px-2 py-1 bg-gray-700">
            {toHumanReadableTime(Math.floor(result.timeMS / 1000))}
          </span>
          <span className="font-semibold text-xs rounded-lg px-2 py-1 bg-gray-700">
            {result.mistakes} mistakes
          </span>
        </div>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  player: RacePlayer;
}

interface ProgressProps {
  progress: Number;
  word: string;
}

export function Progress({ progress, word }: ProgressProps) {
  return (
    <div
      className="w-full bg-white rounded-lg flex items-center"
      style={{
        height: "4px",
      }}
    >
      <div
        className="bg-purple-300 h-full rounded-lg"
        style={{ width: `${progress}%`, transition: "width 200ms ease-in-out" }}
      ></div>
      {word && (
        <span className="font-semibold text-xs rounded-lg px-2 py-1 bg-gray-700">
          {word}
        </span>
      )}
    </div>
  );
}

export function ProgressBar({ player }: ProgressBarProps) {
  const ownerId = useGameStore.getState().owner;
  const isOwner = ownerId === player.id;
  const isCompleted = player.progress === 100;
  return !isCompleted ? (
    <div className="flex row w-full items-center bg-dark-lake rounded-lg px-3 py-2 my-2">
      <span className="flex w-48 ml-1 mr-4 text-sm font-semibold truncate">
        {player.username}
        {isOwner ? (
          <div className="ml-1">
            <CrownIcon />
          </div>
        ) : null}
      </span>
      <Progress progress={player.progress} word={player.recentlyTypedLiteral} />
    </div>
  ) : null;
}

export function PlayHeader() {
  return (
    <div className="w-full relative">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <ResultsContainer />
          <ProgressContainer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
