import { AnimatePresence, motion } from "framer-motion";
import { PlayIcon } from "../../../../../assets/icons";
import { LinkIcon } from "../../../../../assets/icons/LinkIcon";
import { ReloadIcon } from "../../../../../assets/icons/ReloadIcon";
import { WarningIcon } from "../../../../../assets/icons/WarningIcon";
import Button from "../../../../../common/components/Button";
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
        <Button
          color="invisible"
          title="Reload the challenge"
          size="sm"
          onClick={() => game.next()}
          leftIcon={<ReloadIcon />}
        />
      )}
      <Button
        color="invisible"
        title="Invite your friends to race"
        size="sm"
        onClick={() => {
          const url = new URL(window.location.href);
          if (game.id) {
            url.searchParams.set("id", game.id);
          }
          copyToClipboard(url.toString(), `${url} copied to clipboard`);
        }}
        leftIcon={<LinkIcon />}
      />
      {canManuallyStartGame && (
        <Button
          color="invisible"
          title="Start the race"
          size="sm"
          text="Click to start"
          onClick={startGame}
          leftIcon={<PlayIcon />}
        />
      )}
      {waitingForOwnerToStart && <span>Waiting for race to start</span>}
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
