import { AnimatePresence, motion } from "framer-motion";
import { RacePlayer, useGameStore } from "../../../state/game-store";

export function ProgressContainer() {
  useGameStore((state) => state.count);
  const players = Object.values(useGameStore.getState().members);
  return (
    <div className="my-2">
      {players.map((player) => {
        return <ProgressBar key={player.id} player={player} />;
      })}
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
  return (
    <div className="flex row w-full items-center bg-dark-lake rounded-lg px-3 py-2 my-2">
      <span className="w-48 mr-4 text-sm font-semibold truncate">
        {player.username}
      </span>
      <Progress progress={player.progress} word={player.recentlyTypedLiteral} />
    </div>
  );
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
          <ProgressContainer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
