import React, { useState, useEffect } from "react";
import Socket from "../Socket";

import { IQueryParams, IAction, IGameState, IUserGameState } from "../types";
import { useRouter } from "next/router";
import getConfig from "next/config";

const useSocket = (
  dispatch: React.Dispatch<IAction>,
  queryParams: IQueryParams,
  language: string | null,
  setCountdown: React.Dispatch<number>
): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    publicRuntimeConfig: { serverUrl },
  } = getConfig();
  const { id: gameId, mode } = queryParams;
  const router = useRouter();
  useEffect(() => {
    if (window && !queryParams.loading) {
      setSocket(new Socket(serverUrl));
    }
  }, [queryParams.loading, serverUrl]);

  useEffect(() => {
    if (socket) {
      socket.emit("play", { language, mode, gameId });

      socket.subscribe(
        "race_joined_failed",
        (error: string | null, message: any) => {
          if (error) return;
          dispatch({ type: "race_joined_failed", payload: message });
        }
      );

      socket.subscribe(
        "race_disconnected",
        (error: string | null, payload: { reason: string }) => {
          if (error) return;
          // you just got rekt bruh
          router.push(`/?kick_reason=${payload.reason}`);
        }
      );

      socket.subscribe("user_left", (error: string | null, payload: string) => {
        if (error) return;
        dispatch({ type: "user_left", payload });
      });

      socket.subscribe(
        "race_joined",
        (error: string | null, payload: IGameState) => {
          if (error) return;
          dispatch({ type: "race_joined", payload });
        }
      );

      socket.subscribe(
        "challenge_selected",
        (error: string | null, payload: IUserGameState) => {
          if (error) return;
          setCountdown(0);
          dispatch({ type: "challenge_selected", payload });
        }
      );

      socket.subscribe(
        "user_joined",
        (error: string | null, payload: IUserGameState) => {
          if (error) return;
          dispatch({ type: "user_joined", payload });
        }
      );

      socket.subscribe(
        "race_updated",
        (error: string | null, payload: IGameState) => {
          if (error) return;
          dispatch({ type: "race_updated", payload });
        }
      );

      socket.subscribe("race_queued", (error: string | null, payload: any) => {
        if (error) return;
        dispatch({ type: "race_queued", payload });
      });

      socket.subscribe("countdown", (error: string | null, payload: number) => {
        if (error) return;
        setCountdown(payload);
      });

      socket.subscribe("race_started", (error: string | null, payload: any) => {
        if (error) return;
        setCountdown(0);
        dispatch({ type: "race_started", payload });
      });

      socket.subscribe(
        "race_completed",
        (error: string | null, payload: any) => {
          if (error) return;
          dispatch({ type: "race_completed", payload });
        }
      );

      socket.subscribe(
        "user_disconnected",
        (error: string | null, payload: string) => {
          if (error) return;
          dispatch({ type: "user_disconnected", payload });
        }
      );

      socket.subscribe(
        "user_progress_updated",
        (
          error: string | null,
          payload: { userId: string; progress: number }
        ) => {
          if (error) return;
          console.log("user_progress_updated");
          dispatch({ type: "user_progress_updated", payload });
        }
      );

      socket.subscribe(
        "user_race_state_updated",
        (error: string | null, payload: IUserGameState) => {
          if (error) return;
          console.log("received user_race_state_updated");
          dispatch({ type: "user_race_state_updated", payload });
        }
      );

      return () => {
        console.log("disconnected socket");
        socket.disconnect();
      };
    }
  }, [socket]);

  return socket;
};

export default useSocket;
