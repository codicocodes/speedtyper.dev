import { useEffect, useState } from "react";
import SocketLatest from "../../../common/services/Socket";
import { useCodeStore } from "../state/code-store";

export interface Challenge {
  code: string;
  filePath: string;
  language: string;
}

export function useChallenge(socket: SocketLatest): Challenge {
  const initialize = useCodeStore((state) => state.initialize);
  const [challenge, setChallenge] = useState({
    code: "",
    filePath: "",
    language: "",
  });

  useEffect(() => {
    socket.subscribe("challenge_selected", (_, data) => {
      setChallenge({
        code: data.content,
        language: data.project.language,
        filePath: data.path,
      });
      initialize(data.content.replaceAll("\t", "  "));
    });
  }, [socket, initialize]);

  return challenge;
}
