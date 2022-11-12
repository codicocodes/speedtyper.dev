import { AnimatePresence, motion } from "framer-motion";
import { LinkIcon } from "../../../../../assets/icons/LinkIcon";
import { ReloadIcon } from "../../../../../assets/icons/ReloadIcon";
import Button from "../../../../../common/components/Button";
import { useIsPlaying } from "../../../../../common/hooks/useIsPlaying";
import { copyToClipboard } from "../../../../../common/utils/clipboard";
import { toHumanReadableTime } from "../../../../../common/utils/toHumanReadableTime";
import useTotalSeconds from "../../../../../hooks/useTotalSeconds";
import { ChallengeInfo } from "../../../hooks/useChallenge";
import { Game } from "../../../services/Game";
import { useCodeStore } from "../../../state/code-store";
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

export function PlayFooter({ game, challenge }: PlayFooterProps) {
  const isPlaying = useIsPlaying();
  const totalSeconds = useCodeStoreTotalSeconds();
  return (
    <div className="w-full relative mt-2">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {!isPlaying && (
            <div className="absolute w-full">
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
          className="w-full"
        >
          {isPlaying && RenderTimer(totalSeconds)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ActionButtons({ game }: { game: Game }) {
  return (
    <div className="relative">
      <div className="flex row text-faded-gray gap-1">
        <Button
          color="invisible"
          title="Reload the challenge"
          size="sm"
          onClick={() => game.next()}
          leftIcon={<ReloadIcon />}
        />
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
      </div>
    </div>
  );
}

function RenderTimer(seconds: number) {
  return (
    <div className="absolute text-3xl ml-2 font-bold text-purple-300">
      {toHumanReadableTime(seconds)}
    </div>
  );
}
