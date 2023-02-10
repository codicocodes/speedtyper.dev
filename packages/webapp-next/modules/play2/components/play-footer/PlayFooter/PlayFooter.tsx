import { AnimatePresence, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import { PlayIcon } from "../../../../../assets/icons";
import { LinkIcon } from "../../../../../assets/icons/LinkIcon";
import { ReloadIcon } from "../../../../../assets/icons/ReloadIcon";
import { WarningIcon } from "../../../../../assets/icons/WarningIcon";
import { useIsPlaying } from "../../../../../common/hooks/useIsPlaying";
import { copyToClipboard } from "../../../../../common/utils/clipboard";
import { toHumanReadableTime } from "../../../../../common/utils/toHumanReadableTime";
import { Keys, useKeyMap } from "../../../../../hooks/useKeyMap";
import useTotalSeconds from "../../../../../hooks/useTotalSeconds";
import { ChallengeInfo } from "../../../hooks/useChallenge";
import { Game } from "../../../services/Game";
import { useCodeStore } from "../../../state/code-store";
import {
  useGameStore,
  useIsMultiplayer,
  useIsOwner,
} from "../../../state/game-store";
import { ChallengeSource } from "../ChallengeSource";

interface PlayFooterProps {
  game: Game;
  challenge: ChallengeInfo;
}

function useCodeStoreTotalSeconds() {
  // TODO: move useTotalSeconds to modules folder
  const startTime = useCodeStore((state) => state.startTime);
  const endTime = useCodeStore((state) => state.endTime);
  const totalSeconds = useTotalSeconds(
    startTime?.getTime(),
    endTime?.getTime()
  );
  return totalSeconds;
}

function useMistakeWarningMessage() {
  const currentMistakeCount = useCodeStore((state) => state.incorrectChars)()
    .length;
  const message = "Undo mistakes to continue";
  return currentMistakeCount > 10 ? message : undefined;
}

export function PlayFooter({ game, challenge }: PlayFooterProps) {
  const isPlaying = useIsPlaying();
  const totalSeconds = useCodeStoreTotalSeconds();
  const mistakesWarning = useMistakeWarningMessage();
  return (
    <div className="w-full h-10 mt-2">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {!isPlaying && (
            <div className="w-full">
              <div className="flex row justify-between items-top">
                <ActionButtons game={game} />
                <div className="text-faded-gray">
                  <ChallengeSource
                    name={challenge.projectName}
                    url={challenge.url}
                    license={challenge.license}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center w-full"
        >
          {isPlaying && RenderTimer(totalSeconds)}
          {mistakesWarning && (
            <span className="flex ml-2 text-red-400 font-medium gap-1">
              <WarningIcon />
              {mistakesWarning}
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
  text: String;
}

function ActionButton({ text, icon, ...buttonProps }: ActionButtonProps) {
  return (
    <button
      {...buttonProps}
      style={{
        fontFamily: "Fira Code",
      }}
      className="flex text-sm font-light text-dark-ocean items-center justify-between gap-2 rounded-3xl bg-gray-300 hover:bg-gray-400 hover:cursor-pointer px-3 py-1 my-1"
    >
      <div className="flex">{text}</div>
      {icon}
    </button>
  );
}

function ActionButtons({ game }: { game: Game }) {
  const isMultiplayer = useIsMultiplayer();
  const isOwner = useIsOwner();
  const hasEndTime = useCodeStore((state) => state.endTime);
  const countdown = useGameStore((state) => state.countdown);
  const canManuallyStartGame =
    isOwner && isMultiplayer && !hasEndTime && !countdown;
  const waitingForOwnerToStart =
    !isOwner && isMultiplayer && !hasEndTime && !countdown;
  const startGame = () => game.start();
  useKeyMap(canManuallyStartGame, Keys.Enter, startGame);
  return (
    <div className="flex row text-faded-gray gap-1">
      {isOwner && (
        <ActionButton
          text="refresh"
          title="Refresh the challenge"
          onClick={() => game.next()}
          icon={<ReloadIcon />}
        />
      )}
      <ActionButton
        text="invite"
        title="Invite your friends to play"
        icon={<LinkIcon />}
        onClick={() => {
          const url = new URL(window.location.href);
          if (game.id) {
            url.searchParams.set("id", game.id);
          }
          copyToClipboard(url.toString(), `${url} copied to clipboard`);
        }}
      />
      {canManuallyStartGame && (
        <ActionButton
          title="Start the game"
          text="start"
          onClick={startGame}
          icon={<PlayIcon />}
        />
      )}
      {waitingForOwnerToStart && (
        <span className="flex text-sm font-light text-off-white items-center justify-between">
          Waiting for race to start
        </span>
      )}
    </div>
  );
}

function RenderTimer(seconds: number) {
  return (
    <div className="text-3xl ml-2 font-bold text-purple-300">
      {toHumanReadableTime(seconds)}
    </div>
  );
}
