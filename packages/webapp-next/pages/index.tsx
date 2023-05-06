import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSocket } from "../common/hooks/useSocket";
import { Keys, useKeyMap } from "../hooks/useKeyMap";
import { CodeTypingContainer } from "../modules/play2/containers/CodeTypingContainer";
import { useGame } from "../modules/play2/hooks/useGame";
import { useIsCompleted } from "../modules/play2/hooks/useIsCompleted";
import { ResultsContainer } from "../modules/play2/containers/ResultsContainer";
import { fetchUser } from "../common/api/user";
import { useChallenge } from "../modules/play2/hooks/useChallenge";
import { useEndGame } from "../modules/play2/hooks/useEndGame";
import { useResetStateOnUnmount } from "../modules/play2/hooks/useResetStateOnUnmount";
import { PlayFooter } from "../modules/play2/components/play-footer/PlayFooter";
import { PlayHeader } from "../modules/play2/components/play-header/PlayHeader";
import { useInitializeUserStore } from "../common/state/user-store";
import { useCallback, useEffect } from "react";
import { useConnectionManager } from "../modules/play2/state/connection-store";
import {
  closeModals,
  useHasOpenModal,
  useSettingsStore,
} from "../modules/play2/state/settings-store";
import { useIsPlaying } from "../common/hooks/useIsPlaying";
import { refreshTrends } from "../modules/play2/state/trends-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const user = await fetchUser(context);
    return {
      props: {
        user,
      },
    };
  } catch (err) {
    return {
      props: {
        user: null,
      },
    };
  }
};

function Play2Page({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useInitializeUserStore(user);
  const isCompleted = useIsCompleted();
  const isPlaying = useIsPlaying();
  useSocket();
  useConnectionManager();
  const hasOpenModal = useHasOpenModal();
  const game = useGame();
  const challenge = useChallenge();
  const { capsLockActive } = useKeyMap(
    true,
    Keys.Tab,
    useCallback(() => !hasOpenModal && game?.next(), [hasOpenModal, game])
  );
  useSettingsStore((s) => s.settingsModalIsOpen);
  // useKeyMap(true, Keys.Escape, () => {
  //   if (!isPlaying) openSettingsModal();
  // });
  useResetStateOnUnmount();
  useEndGame();
  useEffect(() => {
    if (isPlaying) {
      refreshTrends();
      closeModals();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col relative">
      <>
        <PlayHeader />
        {capsLockActive && (
          <div className="absolute top-[-30px] z-10 flex w-full items-center justify-center gap-2 font-medium text-red-400">
            <div className="w-4 text-dark-ocean">
              <FontAwesomeIcon icon={faLock} className="text-red-400" />
            </div>
            Caps Lock is active
          </div>
        )}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
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
            className="w-full"
          >
            {!isCompleted && (
              <CodeTypingContainer
                filePath={challenge.filePath}
                language={challenge.language}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <PlayFooter challenge={challenge} />
      </>
      <ToastContainer />
    </div>
  );
}

export default Play2Page;
