import { Request, Response } from "express";
import User from "../../models/user";
import github from "../../connectors/github";

const validateLoginReferrer = (url: string | undefined): string => {
  return (
    url ??
    (process.env.NODE_ENV === "production"
      ? "https://speedtyper.dev"
      : "http://localhost:3001")
  );
};

export default async (req: Request, res: Response) => {
  const error = req.query.error?.toString();

  console.log({ error });

  const requestToken = req.query.code?.toString() || "";

  const accessToken = await github.getAccessToken(requestToken);

  const githubUserData = await github.getUser(accessToken);

  if (!githubUserData?.githubId) {
    return req.session?.loginReferrer
      ? res.redirect(req.session?.loginReferrer)
      : res.send({ success: true });
  }

  let userDoc = await User.findOne({ githubId: githubUserData.githubId });

  if (!userDoc) {
    userDoc = new User({
      githubId: githubUserData.githubId,
    });
  }

  userDoc.set({
    username: githubUserData.username,
    avatarUrl: githubUserData.avatarUrl,
    githubUrl: githubUserData.githubUrl,
  });

  const user = await userDoc.save();

  if (req.session) {
    req.session.user = {
      username: user.username,
      id: user._id.toString(),
      avatarUrl: user.avatarUrl,
      guest: false,
      banned: user.banned,
    };
  }

  const validLoginReferrer = validateLoginReferrer(req.session?.loginReferrer);

  res.redirect(validLoginReferrer);
};
