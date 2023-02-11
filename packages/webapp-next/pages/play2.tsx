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
import { useGameIdQueryParam } from "../modules/play2/hooks/useGameIdQueryParam";
import { useConnectToGame } from "../modules/play2/hooks/useConnectToGame";
import { PlayFooter } from "../modules/play2/components/play-footer/PlayFooter";
import { PlayHeader } from "../modules/play2/components/play-header/PlayHeader";
import {
  useInitializeUserStore,
  useUserStore,
} from "../common/state/user-store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getExperimentalServerUrl } from "../common/utils/getServerUrl";

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
  const router = useRouter();
  const isCompleted = useIsCompleted();
  const socket = useSocket();
  const game = useGame(socket);
  const challenge = useChallenge(socket);
  const gameID = useGameIdQueryParam();

  useEffect(() => {
    if (game.id && game.id !== gameID) {
      router.query["id"] = game.id;
      router.push(
        {
          pathname: router.pathname,
          query: router.query,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router, gameID, game.id]);

  useConnectToGame(game, gameID);
  useKeyMap(true, Keys.Tab, () => game.next());
  useResetStateOnUnmount();
  useEndGame();

  return (
    <div className="flex flex-col items-center">
      <>
        <PlayHeader />
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
                game={game}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <PlayFooter game={game} challenge={challenge} />
      </>
      <ToastContainer />
    </div>
  );
}

export default Play2Page;
