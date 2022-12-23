import { NextRouter } from "next/router";
import { useCallback } from "react";
import { getServerUrl, getSiteRoot } from "../utils/getServerUrl";

export const useGithubAuthFactory = (router: NextRouter) => {
  return useCallback(() => {
    const serverUrl = getServerUrl();
    let currentUrl = getSiteRoot();
    if (document !== undefined) {
      currentUrl = window.location.href;
    }
    router.push(`${serverUrl}/auth/github?currentUrl=${currentUrl}`);
  }, [router]);
};
