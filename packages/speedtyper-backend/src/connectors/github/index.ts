import fetch from "node-fetch";

const { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID } = process.env;

export const getAccessToken = async (requestToken: string): Promise<string> => {
  const { access_token: accessToken } = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${requestToken}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    }
  ).then((res) => res.json() as Promise<{ access_token: string }>);
  return accessToken;
};

interface IGithubUser {
  username: string;
  githubUrl?: string;
  email?: string;
  avatarUrl: string;
  githubId: number;
}

export const getUser = async (accessToken: string): Promise<IGithubUser> => {
  const {
    login: username,
    html_url: githubUrl,
    email,
    avatar_url: avatarUrl,
    id: githubId,
  } = await fetch(`https://api.github.com/user`, {
    headers: {
      accept: "application/json",
      Authorization: `token ${accessToken}`,
    },
  }).then((res) => {
    return res.json() as Promise<{
      login: string;
      html_url: string;
      email: string;
      avatar_url: string;
      id: number;
    }>;
  });

  return {
    username,
    email,
    githubUrl,
    avatarUrl,
    githubId,
  };
};

export default {
  getUser,
  getAccessToken,
};
