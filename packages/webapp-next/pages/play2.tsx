import { AnimatePresence, motion } from "framer-motion";
import Router from "next/router";
import { useEffect, useState } from "react";
import { ReloadIcon } from "../assets/icons/ReloadIcon";
import { useSocket } from "../common/hooks/useSocket";
import Button from "../components/Button";
import { useKeyMap } from "../hooks/useKeyMap";
import { CodeTypingContainer } from "../modules/play2/containers/CodeTypingContainer";

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
      Router.push(
        {
          pathname: "/play2",
          query: { id: data.id },
        },
        undefined,
        { shallow: true }
      );
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
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col max-w-5xl items-center justify-center">
        <div
          className="flex flex-row justify-start w-full"
          style={{ color: "rgb(184, 184, 184, 0.8)" }}
        >
          <Button
            color="invisible"
            title="Reload the challenge"
            size="sm"
            onClick={nextChallenge}
            leftIcon={<ReloadIcon />}
          />
        </div>
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
    </div>
  );
}

export default Play2Page;
