import { useEffect, useState } from "react";
import { User } from "../state/user-store";
import { getExperimentalServerUrl } from "../utils/getServerUrl";
import { ServerSideContext } from "./types";

const USER_API = "/api/user";

const withCookie = (ctx?: ServerSideContext) => {
  const cookie = ctx?.req?.headers?.cookie;
  return cookie ? { cookie } : undefined;
};

const withSetHeaders = (resp: Response, ctx?: ServerSideContext) => {
  const setCookie = resp.headers.get("set-cookie");
  if (ctx && setCookie) {
    ctx.res.setHeader("set-cookie", setCookie);
  }
  return resp;
};

export const fetchUser = async (context?: ServerSideContext) => {
  const serverUrl = getExperimentalServerUrl();
  const url = serverUrl + USER_API;
  return fetch(url, {
    credentials: "include",
    headers: withCookie(context),
  }).then((resp) => withSetHeaders(resp, context).json());
};

export const fetchUser2 = async () => {
  const serverUrl = getExperimentalServerUrl();
  const url = serverUrl + USER_API;
  return fetch(url, {
    credentials: "include",
  }).then((resp) => resp.json());
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser2().then((u) => setUser(u));
  }, []);
  return user;
};
