import { NextRouter } from "next/router";
import { useCallback } from "react";
import { useGameStore } from "../../modules/play2/state/game-store";
import { useUserStore } from "../state/user-store";
import { getExperimentalServerUrl, getSiteRoot } from "../utils/getServerUrl";
import { fetchUser } from "./user";

export const useGithubAuthFactory = (router: NextRouter, serverUrl: string) => {
  return useCallback(() => {
    let nextUrl = getSiteRoot();
    if (document !== undefined) {
      nextUrl = window.location.href;
    }
    const authUrl = `${serverUrl}/auth/github?next=${nextUrl}`;
    router.push(authUrl);
  }, [router, serverUrl]);
};

export const logout = async () => {
  const serverUrl = getExperimentalServerUrl();
  const authUrl = `${serverUrl}/api/auth`;
  return fetch(authUrl, {
    method: "DELETE",
    credentials: "include",
  }).then(async () => {
    const prevUserId = useUserStore.getState().id;
    const user = await fetchUser();
    useUserStore.setState((state) => ({
      ...state,
      ...user,
      avatarUrl: undefined,
    }));
    useGameStore.setState((state) => {
      return {
        ...state,
        owner: state.owner === prevUserId ? user.id : state.owner,
      };
    });
  });
};
