import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
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
import { Game } from "../modules/play2/services/Game";
import { fetchUser } from "../common/api/user";
import { useChallenge } from "../modules/play2/hooks/useChallenge";
import { useEndGame } from "../modules/play2/hooks/useEndGame";
import { useResetStateOnUnmount } from "../modules/play2/hooks/useResetStateOnUnmount";
import { useGameIdQueryParam } from "../modules/play2/hooks/useGameIdQueryParam";
import { useConnectToGame } from "../modules/play2/hooks/useConnectToGame";
import { useSendKeyStrokes } from "../modules/play2/hooks/useSendKeyStrokes";

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
  const socket = useSocket();
  const game = useGame(socket);
  const challenge = useChallenge(socket);
  const gameID = useGameIdQueryParam();
  const startTime = useCodeStore((state) => state.startTime);
  const endTime = useCodeStore((state) => state.endTime);

  useConnectToGame(game, gameID);
  useKeyMap(true, Keys.Tab, () => game.next());
  useResetStateOnUnmount();
  useEndGame();
  useSendKeyStrokes(game);

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
                    {RenderActionButtons(game)}
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

function RenderActionButtons(game: Game) {
  return (
    <div className="relative">
      <div className="text-faded-gray">
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

export default Play2Page;
