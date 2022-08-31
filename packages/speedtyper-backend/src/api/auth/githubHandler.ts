import { Request, Response } from "express";

const { GITHUB_CLIENT_ID, SERVER_URI } = process.env;

export default async (req: Request, res: Response) => {
  const currentUrl = req.query.currentUrl?.toString() || "";

  if (req.session) {
    req.session.loginReferrer = currentUrl;
  }

  const githubUri = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user&redirect_uri=${SERVER_URI}/auth/github/callback`;

  res.redirect(githubUri);
};
