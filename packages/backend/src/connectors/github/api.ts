import fetch from "node-fetch";

class GithubAPI {
  BASE_URL = "https://api.github.com";
  REPOSITORY_URL = `${this.BASE_URL}/repos`;

  constructor(private _token: string) {}

  async fetchRepository(slug: string): Promise<unknown> {
    const res = await fetch(`${this.REPOSITORY_URL}/${slug}`, {
      headers: {
        Authorization: `token ${this._token}`,
      },
    });
    return handleFetchResponse(res);
  }

  // private _parseGithubRateLimit(response: fetch.Response) {
  //   const limit = response.headers.get("x-ratelimit-limit");
  //   const remaining = response.headers.get("x-ratelimit-remaining");
  //   const reset = response.headers.get("x-ratelimit-reset");
  //   return {
  //     limit,
  //     remaining,
  //     reset,
  //   };
  // }
}

const handleFetchResponse = async (
  response: fetch.Response
): Promise<unknown> => {
  if (!response.ok) {
    const status = response.status;
    return Promise.reject(status);
  }
  return response.json();
};

export default GithubAPI;
