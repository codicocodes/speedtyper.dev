import fetch from "node-fetch";

import GithubAPI from "../api";
import { FailedGithubRequest, InvalidGithubRepository } from "../errors";
import { parseGithubRepository } from "../schema/repository";

import repository from "./mock-responses/repository";

jest.mock("node-fetch");

// @ts-ignore next-line
const mockFetch = fetch as MockedFunction<typeof fetch>;
const mockToken = "asdf";

describe("GithubAPI", () => {
  let api = new GithubAPI(mockToken);

  beforeEach(() => {
    api = new GithubAPI(mockToken);
  });

  describe("fetchRepository", () => {
    // @ts-ignore next-line
    const text = jest.fn() as MockedFunction<any>;
    beforeEach(() => {
      text.mockResolvedValue(JSON.stringify(repository));
      mockFetch.mockResolvedValue({ ok: true, text } as Response);
    });

    it("calls node-fetch with the expected arguments", async () => {
      await api.fetchRepository(repository.full_name);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.github.com/repos/phaazon/luminance-rs",
        { headers: { Authorization: `token ${mockToken}` } }
      );
    });

    it("returns a valid github repository when the api call succeeds", async () => {
      const repo = await api.fetchRepository(repository.full_name);
      expect(repo).not.toBeUndefined();
      expect(repo.id).toBe(repository.id);
      expect(repo.node_id).toBe(repository.node_id);
    });

    it("throws an error when the api call fails", async () => {
      const status = 404;
      mockFetch.mockResolvedValue({ ok: false, status });
      const err = await api.fetchRepository(repository.full_name).catch((e) => {
        return e;
      });
      expect(err instanceof FailedGithubRequest).toBe(true);
      expect(err.status).toBe(status);
    });

    it("throws an InvalidGithubRepository error when the response is empty", async () => {
      text.mockResolvedValue("");
      const err = await api.fetchRepository(repository.full_name).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubRepository).toBe(true);
    });

    it("throws an InvalidGithubRepository error when the response is missing required properties", async () => {
      text.mockResolvedValue(cloneWithoutProps(repository, ["id", "node_id"]));
      const err = await api.fetchRepository(repository.full_name).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubRepository).toBe(true);
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cloneWithoutProps(obj: any, props: string[]): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clone: any = parseGithubRepository(JSON.stringify(obj));
  for (const prop of props) {
    delete clone[prop];
  }
  return JSON.stringify(clone);
}
