import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getServerUrl } from "../common/utils/getServerUrl";
import { useKeyMap } from "../hooks/useKeyMap";
import { CodeTypingContainer } from "../modules/play2/containers/CodeTypingContainer";
import Socket from "../Socket";

function useSocket() {
  return useMemo(() => {
    const serverUrl = getServerUrl();
    return new Socket(serverUrl);
  }, []);
}

function Play2Page() {
  // TODO: Refactor this page
  const socket = useSocket();
  const [_, setRoomID] = useState<string | null>(null);

  function nextChallenge() {
    socket?.emit("refresh_challenge");
  }

  // FIXME: Tab should be not a string literal
  useKeyMap(true, "Tab", nextChallenge);

  const [challenge, setChallenge] = useState({
    code: "",
    filePath: "",
    language: "",
  });

  useEffect(() => {
    // TODO: handle joining other rooms
    socket.emit("play", { mode: "private" });
    socket.subscribe("race_joined", (_, data) => {
      // TODO: all the data we want is: roomID, members[]
      setRoomID(data.id);
    });
    socket.subscribe("challenge_selected", (_, data) => {
      setChallenge({
        code: data.fullCodeString,
        language: data.language,
        filePath: "",
      });
    });
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row justify-start text-white w-full">hi</div>
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
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Play2Page;
