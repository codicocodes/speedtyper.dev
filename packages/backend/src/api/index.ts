import getAnalytics from "./getAnalytics";
import { HttpMethods } from "../types";
import githubHandler from "./auth/githubHandler";
import logoutHandler from "./auth/logoutHandler";
import githubCallback from "./auth/githubCallback";
import meHandler from "./me";
import userResultsHandler from "./userResults";
import dailyLeaderboard from "./dailyLeaderboard";
import getLanguages from "./getLanguages";
import getGameCountUserBadge from "./getGameCountUserBadge";
import getAverageWpmUserBadge from "./getAverageWpmUserBadge";
import getTopWpmUserBadge from "./getTopWpmUserBadge";
import getTopResultsByChallengeId from "./getTopResultsByChallengeId";
import { streamAllResults, streamAllUsers } from "./internal/internalApi";

// git commit -m "WIP in progress"
// git stash <- trying to learn it, but im not using it that much yet
// whats lazygit

export default [
  { method: HttpMethods.GET, path: "/internal/users", handler: streamAllUsers },
  {
    method: HttpMethods.GET,
    path: "/internal/results",
    handler: streamAllResults,
  },
  { method: HttpMethods.GET, path: "/analytics", handler: getAnalytics },
  { method: HttpMethods.GET, path: "/auth/github", handler: githubHandler },
  {
    method: HttpMethods.GET,
    path: "/auth/github/callback",
    handler: githubCallback,
  },
  { method: HttpMethods.DELETE, path: "/auth", handler: logoutHandler },
  {
    method: HttpMethods.GET,
    path: "/me",
    handler: meHandler,
  },
  {
    method: HttpMethods.GET,
    path: "/leaderboards/daily",
    handler: dailyLeaderboard,
  },
  {
    method: HttpMethods.GET,
    path: "/users/:id/results",
    handler: userResultsHandler,
  },
  {
    method: HttpMethods.GET,
    path: "/challenges/:id/results/top",
    handler: getTopResultsByChallengeId,
  },
  {
    method: HttpMethods.GET,
    path: "/languages",
    handler: getLanguages,
  },
  {
    method: HttpMethods.GET,
    path: "/users/:username/badges/averagewpm",
    handler: getAverageWpmUserBadge,
  },
  {
    method: HttpMethods.GET,
    path: "/users/:username/badges/topwpm",
    handler: getTopWpmUserBadge,
  },
  {
    method: HttpMethods.GET,
    path: "/users/:username/badges/gamecount",
    handler: getGameCountUserBadge,
  },
  // {
  //   method: HttpMethods.GET,
  //   path: "/users/:username/badges/gamecount",
  //   handler: getGameCountUserBadge,
  // },
  // {
  //   method: HttpMethods.GET,
  //   path: "/badges/projects/:project",
  //   handler: getProjectBadge,
  // },
];
