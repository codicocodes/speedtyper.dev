import { NextRouter } from "next/router";
import { useCallback } from "react";
import { getSiteRoot } from "../utils/getServerUrl";

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
