import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { LinkIcon } from "../assets/icons/LinkIcon";
import { ReloadIcon } from "../assets/icons/ReloadIcon";
import { useSocket } from "../common/hooks/useSocket";
import Button from "../components/Button";
import { useKeyMap } from "../hooks/useKeyMap";
import { CodeTypingContainer } from "../modules/play2/containers/CodeTypingContainer";
import { useGame } from "../modules/play2/hooks/useGame";
import { copyToClipboard } from "../common/utils/clipboard";

function Play2Page() {
  // TODO: Refactor this page
  const socket = useSocket();
  const gameControls = useGame(socket);

  // TODO: Move isTyping to a React Context so it can be accessed anywhere in the app...
  const [isTyping, setIsTyping] = useState(false);

  // FIXME: Tab should be not a string literal
  useKeyMap(true, "Tab", gameControls.next);

  const [challenge, setChallenge] = useState({
    code: "",
    filePath: "",
    language: "",
  });

  useEffect(() => {
    gameControls.play();

    // TODO: handle joining other rooms
    socket.subscribe("challenge_selected", (_, data) => {
      setChallenge({
        code: data.fullCodeString,
        language: data.language,
        filePath: "",
      });
    });
  }, [socket, gameControls]);

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col max-w-5xl m-1 items-center justify-center">
          <>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CodeTypingContainer
                  code={challenge.code}
                  filePath={challenge.filePath}
                  language={challenge.language}
                  setIsTyping={setIsTyping}
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                {!isTyping && RenderActionButtons(gameControls.next)}
              </motion.div>
            </AnimatePresence>
          </>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

function RenderActionButtons(nextChallenge: () => void) {
  return (
    <div className="relative">
      <div className="absolute" style={{ color: "rgb(184, 184, 184, 0.8)" }}>
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
    </div>
  );
}

export default Play2Page;
