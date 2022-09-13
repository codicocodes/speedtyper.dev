import fetch from "node-fetch";
import {
  FailedGithubRequest,
  InvalidGithubRepository,
  InvalidGithubToken,
  InvalidGithubTree,
  InvalidGithubUser,
} from "./errors";
import { GithubRepository, parseGithubRepository } from "./schema/repository";
import { parseGithubToken } from "./schema/token";
import { GithubTree as GithubTree, parseGithubTree } from "./schema/tree";
import { GithubUser, parseGithubUser } from "./schema/user";

class GithubAPI {
  BASE_URL = "https://api.github.com";
  REPOSITORY_URL = `${this.BASE_URL}/repos`;
  USER_URL = `${this.BASE_URL}/user`;

  constructor(private _token: string) {}

  async fetchRepository(slug: string): Promise<GithubRepository> {
    const data = await this.fetch(`${this.REPOSITORY_URL}/${slug}`);
    const repository = parseGithubRepository(data);
    if (repository) return repository;
    throw new InvalidGithubRepository(parseGithubRepository.message);
  }

  async fetchUser(): Promise<GithubUser> {
    const data = await this.fetch(this.USER_URL);
    const user = parseGithubUser(data);
    if (user) return user;
    throw new InvalidGithubUser(parseGithubRepository.message);
  }

  async fetchGitTree(repo: string, sha: string): Promise<GithubTree> {
    const treeUrl = `${this.REPOSITORY_URL}/${repo}/git/trees/${sha}?recursive=true`;
    const data = await this.fetch(treeUrl);
    const tree = parseGithubTree(data);
    if (tree) return tree;
    throw new InvalidGithubTree(parseGithubRepository.message);
  }

  private async fetch(url: string): Promise<string> {
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${this._token}`,
      },
    });
    return await handleFetchResponse(res);
  }
}

const handleFetchResponse = async (
  response: fetch.Response
): Promise<string> => {
  if (!response.ok) {
    const status = response.status;
    throw new FailedGithubRequest(status);
  }
  return response.text();
};

export class GithubAuthAPI {
  async fetchAccessToken(code: string) {
    const data = await this._fetchAccessToken(code).then(handleFetchResponse);
    const githubToken = parseGithubToken(data);
    if (githubToken) return githubToken.access_token;
    throw new InvalidGithubToken(parseGithubToken.message);
  }
  private async _fetchAccessToken(code: string) {
    const { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID } = process.env;
    return fetch(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      }
    );
  }
}

export default GithubAPI;
