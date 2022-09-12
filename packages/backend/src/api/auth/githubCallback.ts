import { Request, Response } from "express";
import User, { UserDoc } from "../../models/user";
import GithubAPI, { GithubAuthAPI } from "../../connectors/github/api";
import { GithubUser } from "../../connectors/github/schema/user";

const getBaseURL = (loginReferrer?: string): string => {
  return (
    loginReferrer ??
    (process.env.NODE_ENV === "production"
      ? "https://speedtyper.dev"
      : "http://localhost:3001")
  );
};

function getRedirectURL(req: Request, error?: string): string {
  const loginReferrer = req.session?.loginReferrer;
  const baseUrl = getBaseURL(loginReferrer);
  const url = new URL(baseUrl);
  if (error) {
    url.searchParams.set("login-error", error);
  }
  return url.toString();
}

async function upsertGithubUser(githubUser: GithubUser) {
  let userDoc = await User.findOne({ githubId: githubUser.id });

  if (!userDoc) {
    userDoc = new User({
      githubId: githubUser.id,
    });
  }

  userDoc.set({
    username: githubUser.login,
    avatarUrl: githubUser.avatar_url,
    githubUrl: githubUser.html_url,
  });

  const user = await userDoc.save();

  return user;
}

function saveUserToSession(req: Request, user: UserDoc) {
  if (req.session) {
    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      avatarUrl: user.avatarUrl,
      banned: user.banned,
      guest: false,
    };
    return true;
  }
  return false;
}

export default async function GithubCallback(req: Request, res: Response) {
  const error = req.query.error?.toString();

  if (error) {
    res.redirect(getRedirectURL(req, error));
    return;
  }

  const code = req.query.code?.toString() || "";

  if (!code) {
    res.redirect(getRedirectURL(req, "failed login"));
    return;
  }

  try {
    const auth = new GithubAuthAPI();
    const token = await auth.fetchAccessToken(code);
    const api = new GithubAPI(token);
    const githubUser = await api.fetchUser();
    const user = await upsertGithubUser(githubUser);
    saveUserToSession(req, user);
    res.redirect(getRedirectURL(req));
  } catch (err) {
    console.log("Failed GithubCallback", err);
    res.redirect(getRedirectURL(req, "failed login"));
  }
}
