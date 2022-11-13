import { useEffect, useState } from "react";
import SocketLatest from "../../../common/services/Socket";
import { useCodeStore } from "../state/code-store";

export interface ChallengeInfo {
  code: string;
  filePath: string;
  language: string;
  url: string;
  projectName: string;
  license: string;
}

export function useChallenge(socket: SocketLatest): ChallengeInfo {
  const initialize = useCodeStore((state) => state.initialize);
  const [challenge, setChallenge] = useState({
    loaded: false,
    code: "",
    filePath: "",
    language: "",
    url: "",
    projectName: "",
    license: "",
  });

  useEffect(() => {
    socket.subscribe("challenge_selected", (_, data) => {
      setChallenge({
        loaded: true,
        projectName: data.project.fullName,
        url: data.url,
        code: data.content,
        language: data.project.language,
        filePath: data.path,
        license: data.project.licenseName,
      });
      initialize(data.content.replaceAll("\t", "  "));
    });
  }, [socket, initialize]);

  return challenge;
}
