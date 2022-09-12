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

export default {
  getAccessToken,
};
