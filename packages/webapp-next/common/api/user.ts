import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getExperimentalServerUrl } from "../utils/getServerUrl";

const USER_API = "/api/user";

const withCookie = (
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const cookie = ctx?.req?.headers?.cookie;
  return cookie ? { cookie } : undefined;
};

const withSetHeaders = (
  resp: Response,
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const setCookie = resp.headers.get("set-cookie");
  if (ctx && setCookie) {
    ctx.res.setHeader("set-cookie", setCookie);
  }
  return resp;
};

export const fetchUser = async (
  context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const serverUrl = getExperimentalServerUrl();
  const url = serverUrl + USER_API;
  return fetch(url, {
    credentials: "include",
    headers: withCookie(context),
  }).then((resp) => withSetHeaders(resp, context).json());
};
