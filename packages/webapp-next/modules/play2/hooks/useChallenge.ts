import { useEffect, useState } from "react";
import SocketLatest from "../../../common/services/Socket";
import { useCodeStore } from "../state/code-store";
import { useConnectionStore } from "../state/connection-store";

export interface ChallengeInfo {
  code: string;
  filePath: string;
  language: string;
  url: string;
  projectName: string;
  license: string;
}

export function useChallenge(): ChallengeInfo {
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

  const socket = useConnectionStore((s) => s.socket);

  useEffect(() => {
    socket?.subscribe("challenge_selected", (_, challenge) => {
      setChallenge({
        loaded: true,
        projectName: challenge.project.fullName,
        url: challenge.url,
        code: challenge.content,
        language: challenge.project.language,
        filePath: challenge.path,
        license: challenge.project.licenseName,
      });
      initialize(challenge.content.replaceAll("\t", "  "));
    });
    socket?.subscribe("race_joined", (_, raceData) => {
      const { challenge } = raceData;
      setChallenge({
        loaded: true,
        projectName: challenge.project.fullName,
        url: challenge.url,
        code: challenge.content,
        language: challenge.project.language,
        filePath: challenge.path,
        license: challenge.project.licenseName,
      });
      initialize(challenge.content.replaceAll("\t", "  "));
    });
  }, [socket, initialize]);

  return challenge;
}
