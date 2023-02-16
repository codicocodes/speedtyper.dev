import { useCallback, useEffect } from "react";
import create from "zustand";
import { fetchRaceStatus } from "../../../common/api/races";
import SocketLatest from "../../../common/services/Socket";
import { updateUserInStore } from "../../../common/state/user-store";
import { useGameStore } from "./game-store";

export interface ConnectionState {
  isConnected: boolean;
  raceExistsInServer: boolean;
  alreadyPlaying: boolean;
  socket?: SocketLatest;
}

export const useConnectionStore = create<ConnectionState>((_set, _get) => ({
  isConnected: true,
  raceExistsInServer: true,
  alreadyPlaying: false,
}));

export const refreshRaceState = async (raceId: string) => {
  fetchRaceStatus(raceId).then(({ ok }) => {
    useConnectionStore.setState((state) => ({
      ...state,
      raceExistsInServer: ok,
    }));
  });
};

export const useRefreshRaceStatus = () => {
  const raceId = useGameStore((state) => state.id);
  useEffect(() => {
    if (raceId) {
      fetchRaceStatus(raceId);
    }
  }, [raceId]);
};

export const setRaceExists = () => {
  useConnectionStore.setState((state) => ({
    ...state,
    raceExistsInServer: true,
  }));
};

export const useConnectionManager = () => {
  const socket = useConnectionStore((s) => s.socket);
  const isConnected = useConnectionStore((state) => state.isConnected);
  const raceId = useGameStore((state) => state.id);
  const onConnect = useCallback(
    (_err: string | null, _msg: string) => {
      useConnectionStore.setState((state) => ({ ...state, isConnected: true }));
      if (raceId && !isConnected) {
        fetchRaceStatus(raceId).then(({ ok }) => {
          const currentRaceID = useGameStore.getState().id;
          const raceExistsInServer = currentRaceID !== currentRaceID || ok;
          useConnectionStore.setState((state) => ({
            ...state,
            raceExistsInServer,
          }));
        });
        updateUserInStore();
      }
    },
    [isConnected, raceId]
  );
  useEffect(() => {
    const onAlreadyPlaying = () => {
      console.log("alreadyPlaying received");
      useConnectionStore.setState((state) => ({
        ...state,
        alreadyPlaying: true,
      }));
    };
    const onDisconnect = (_err: string | null, _msg: string) => {
      useConnectionStore.setState((state) => ({
        ...state,
        isConnected: false,
      }));
    };
    socket?.subscribe("already_playing", onAlreadyPlaying);
    socket?.subscribe("connect_error", onDisconnect);
    socket?.subscribe("disconnect", onDisconnect);
    socket?.subscribe("connect", onConnect);
  }, [socket, onConnect]);
};
