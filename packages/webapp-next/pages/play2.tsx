import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { LinkIcon } from "../assets/icons/LinkIcon";
import { ReloadIcon } from "../assets/icons/ReloadIcon";
import { useSocket } from "../common/hooks/useSocket";
import Button from "../common/components/Button";
import { Keys, useKeyMap } from "../hooks/useKeyMap";
import { CodeTypingContainer } from "../modules/play2/containers/CodeTypingContainer";
import { useGame } from "../modules/play2/hooks/useGame";
import { copyToClipboard } from "../common/utils/clipboard";
import { useCodeStore } from "../modules/play2/state/code-store";
import useTotalSeconds from "../hooks/useTotalSeconds";
import { useIsPlaying } from "../common/hooks/useIsPlaying";
import { useIsCompleted } from "../modules/play2/hooks/useIsCompleted";
import { ResultsContainer } from "../modules/play2/containers/ResultsContainer";
import { toHumanReadableTime } from "../common/utils/toHumanReadableTime";
import { ChallengeSource } from "../modules/play2/components/play-footer/ChallengeSource";
import { fetchUser } from "../common/api/user";
import { useChallenge } from "../modules/play2/hooks/useChallenge";
import { useEndGame } from "../modules/play2/hooks/useEndGame";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await fetchUser(context);
  return {
    props: {
      user,
    },
  };
};

function Play2Page(_: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isPlaying = useIsPlaying();
  const isCompleted = useIsCompleted();
  const endGame = useCodeStore((state) => state.end);
  const initialize = useCodeStore((state) => state.initialize);
  const socket = useSocket();
  const game = useGame(socket);

  // FIXME: Tab should be not a string literal
  useKeyMap(true, Keys.Tab, () => game.next());

  // Reset state when leaving page
  useEffect(() => {
    return () => {
      initialize("");
    };
  }, [initialize]);

  const challenge = useChallenge(socket);
  const startTime = useCodeStore((state) => state.startTime);
  const endTime = useCodeStore((state) => state.endTime);

  useEndGame();

  // TODO: move useTotalSeconds to modules folder
  const totalSeconds = useTotalSeconds(
    startTime?.getTime(),
    endTime?.getTime()
  );

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div
          className="flex flex-col max-w-5xl items-center justify-center"
          style={{
            width: "920px",
          }}
        >
          <>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full m-2"
              >
                {isCompleted && <ResultsContainer />}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full m-2"
              >
                {!isCompleted && (
                  <CodeTypingContainer
                    filePath={challenge.filePath}
                    language={challenge.language}
                  />
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
                {!isPlaying && (
                  <div className="flex row justify-between items-top">
                    {RenderActionButtons(() => game.next())}
                    <div className="text-faded-gray">
                      <ChallengeSource
                        name="speedtyper.dev"
                        url="https://github.com/codicocodes/speedtyper.dev"
                        license="MIT"
                      />
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
          </>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

function RenderTimer(seconds: number) {
  return (
    <div className="text-3xl ml-4 font-bold text-purple-300 h-[42px]">
      {toHumanReadableTime(seconds)}
    </div>
  );
}

function RenderActionButtons(nextChallenge: () => void) {
  return (
    <div className="text-faded-gray h-[42px]">
      <Button
        color="invisible"
        title="Reload the challenge"
        size="sm"
        onClick={nextChallenge}
        leftIcon={<ReloadIcon />}
      />
      <Button
        color="invisible"
        title="Invite your friends to race"
        size="sm"
        onClick={() => {
          copyToClipboard(window.location.href, "URL copied to clipboard");
        }}
        leftIcon={<LinkIcon />}
      />
    </div>
  );
}

export default Play2Page;
