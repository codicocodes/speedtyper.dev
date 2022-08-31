import { HttpMethods } from "../../types";
import githubHandler from "./githubHandler";
import githubCallback from "./githubCallback";
import logoutHandler from "./logoutHandler";

export default [
  {
    method: HttpMethods.GET,
    path: "/auth/github",
    handler: githubHandler,
  },
  {
    method: HttpMethods.GET,
    path: "/auth/github/callback",
    handler: githubCallback,
  },
  {
    method: HttpMethods.DELETE,
    path: "/auth",
    handler: logoutHandler,
  },
];
