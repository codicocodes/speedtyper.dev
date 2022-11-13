import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const { GITHUB_CLIENT_ID, SERVER_URI } = process.env;

const GITHUB_REDIRECT_URI = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user&redirect_uri=${SERVER_URI}/auth/github/callback`;

export default async (req: Request, res: Response) => {
  saveLoginReferrer(req);
  res.redirect(GITHUB_REDIRECT_URI);
};

function saveLoginReferrer(req: Request) {
  const currentUrl = req.query.currentUrl?.toString();
  if (req.session) {
    req.session.loginReferrer = currentUrl;
  }
}
