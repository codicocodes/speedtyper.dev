import fetch from "node-fetch";
import {
  FailedGithubRequest,
  InvalidGithubRepository,
  InvalidGithubUser,
} from "./errors";
import { GithubRepository, parseGithubRepository } from "./schema/repository";
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

export default GithubAPI;
