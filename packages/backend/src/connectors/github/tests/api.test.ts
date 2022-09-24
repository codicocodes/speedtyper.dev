import fetch from "node-fetch";
jest.mock("node-fetch");

import GithubAPI, { GithubAuthAPI } from "../api";
import {
  FailedGithubRequest,
  InvalidGithubBlob,
  InvalidGithubRepository,
  InvalidGithubToken,
  InvalidGithubTree,
  InvalidGithubUser,
} from "../errors";
import { parseGithubBlob } from "../schema/blob";
import { parseGithubRepository } from "../schema/repository";
import { parseGithubToken } from "../schema/token";
import { parseGithubTree } from "../schema/tree";
import { parseGithubUser } from "../schema/user";
import blob from "./mock-responses/blob";
import gitTree, { gitTreeRepoSlug } from "./mock-responses/git-tree";

import repository from "./mock-responses/repository";
import user from "./mock-responses/user";

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
const text = jest.fn() as jest.MockedFunction<any>;

describe("GithubAPI", () => {
  const mockToken = "asdf";
  let api = new GithubAPI(mockToken);

  beforeEach(() => {
    api = new GithubAPI(mockToken);
  });

  describe("fetchBlob", () => {
    const node = gitTree.tree[0];
    beforeEach(() => {
      text.mockResolvedValue(JSON.stringify(blob));
      // @ts-ignore next-line
      mockFetch.mockResolvedValue({ ok: true, text } as Response);
    });

    it("calls node-fetch with the expected arguments", async () => {
      await api.fetchBlob(gitTreeRepoSlug, node.sha);
      expect(mockFetch).toHaveBeenCalledWith(node.url, {
        headers: { Authorization: `token ${mockToken}` },
      });
    });

    it("returns a valid github blob when the api call succeeds", async () => {
      const fetchedBlob = await api.fetchBlob(gitTreeRepoSlug, node.sha);
      expect(fetchedBlob).not.toBeUndefined();
      expect(fetchedBlob.content).toBe(blob.content);
      expect(fetchedBlob.node_id).toBe(blob.node_id);
      expect(fetchedBlob.encoding).toBe("base64");
    });

    it("throws an error when the api call fails", async () => {
      const status = 404;
      // @ts-ignore next-line
      mockFetch.mockResolvedValue({ ok: false, status });
      const err = await api.fetchBlob(gitTreeRepoSlug, node.sha).catch((e) => {
        return e;
      });
      expect(err instanceof FailedGithubRequest).toBe(true);
      expect(err.status).toBe(status);
    });

    it("throws an InvalidGithubBlob error when the response is empty", async () => {
      text.mockResolvedValue("");
      const err = await api.fetchBlob(gitTreeRepoSlug, node.sha).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubBlob).toBe(true);
    });

    it("throws an InvalidGithubBlob error when the response is missing required properties", async () => {
      text.mockResolvedValue(
        cloneWithoutProps(blob, ["encoding", "node_id"], parseGithubBlob)
      );
      const err = await api.fetchBlob(gitTreeRepoSlug, node.sha).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubBlob).toBe(true);
    });
  });

  describe("fetchRepository", () => {
    beforeEach(() => {
      text.mockResolvedValue(JSON.stringify(repository));
      // @ts-ignore next-line
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
      // @ts-ignore next-line
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
      text.mockResolvedValue(
        cloneWithoutProps(repository, ["id", "node_id"], parseGithubRepository)
      );
      const err = await api.fetchRepository(repository.full_name).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubRepository).toBe(true);
    });
  });

  describe("fetchUser", () => {
    beforeEach(() => {
      text.mockResolvedValue(JSON.stringify(user));
      // @ts-ignore next-line
      mockFetch.mockResolvedValue({ ok: true, text } as Response);
    });

    it("calls node-fetch with the expected arguments", async () => {
      await api.fetchUser();
      expect(mockFetch).toHaveBeenCalledWith("https://api.github.com/user", {
        headers: { Authorization: `token ${mockToken}` },
      });
    });

    it("returns a valid github user when the api call succeeds", async () => {
      const user = await api.fetchUser();
      expect(user).not.toBeUndefined();
      expect(user.id).toBe(user.id);
      expect(user.login).toBe(user.login);
      expect(user.html_url).toBe(user.html_url);
      expect(user.email).toBe(user.email);
      expect(user.avatar_url).toBe(user.avatar_url);
    });

    it("throws an error when the api call fails", async () => {
      const status = 404;
      // @ts-ignore next-line
      mockFetch.mockResolvedValue({ ok: false, status });
      const err = await api.fetchUser().catch((e) => {
        return e;
      });
      expect(err instanceof FailedGithubRequest).toBe(true);
      expect(err.status).toBe(status);
    });

    it("throws an InvalidGithubUser error when the response is empty", async () => {
      text.mockResolvedValue("");
      const err = await api.fetchUser().catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubUser).toBe(true);
    });

    it("throws an InvalidGithubUser error when the response is missing required properties", async () => {
      text.mockResolvedValue(
        cloneWithoutProps(user, ["id", "login"], parseGithubUser)
      );
      const err = await api.fetchUser().catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubUser).toBe(true);
    });
  });

  describe("fetchTree", () => {
    const slug = "codicocodes/check-stream";
    const sha = "main";
    beforeEach(() => {
      text.mockResolvedValue(JSON.stringify(gitTree));
      // @ts-ignore next-line
      mockFetch.mockResolvedValue({ ok: true, text } as Response);
    });

    it("calls node-fetch with the expected arguments", async () => {
      const treeUrl = `${api.REPOSITORY_URL}/${slug}/git/trees/${sha}?recursive=true`;
      await api.fetchGitTree(slug, sha);
      expect(mockFetch).toHaveBeenCalledWith(treeUrl, {
        headers: { Authorization: `token ${mockToken}` },
      });
    });

    it("returns a valid git tree when the api call succeeds", async () => {
      const root = await api.fetchGitTree(slug, sha);
      expect(root).not.toBeUndefined();
      expect(root.url).toBe(gitTree.url);
      expect(root.sha).toBe(gitTree.sha);
      expect(root.tree).toEqual(gitTree.tree);
    });

    it("throws an error when the api call fails", async () => {
      const status = 404;
      // @ts-ignore next-line
      mockFetch.mockResolvedValue({ ok: false, status });
      const err = await api.fetchGitTree(slug, sha).catch((e) => {
        return e;
      });
      expect(err instanceof FailedGithubRequest).toBe(true);
      expect(err.status).toBe(status);
    });

    it("throws an InvalidGithubTree error when the response is empty", async () => {
      text.mockResolvedValue("");
      const err = await api.fetchGitTree(slug, sha).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubTree).toBe(true);
    });

    it("throws an InvalidGithubTree error when the response is missing required properties", async () => {
      text.mockResolvedValue(
        cloneWithoutProps(gitTree, ["sha"], parseGithubTree)
      );
      const err = await api.fetchGitTree(slug, sha).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubTree).toBe(true);
    });
  });
});

describe("GithubAuthAPI", () => {
  let api = new GithubAuthAPI();

  beforeEach(() => {
    api = new GithubAuthAPI();
  });

  describe("fetchAccessToken", () => {
    const expectedToken = "asdf";
    const expectedResponse = { access_token: expectedToken };
    const GITHUB_CLIENT_ID = "123";
    const GITHUB_CLIENT_SECRET = "234";
    const code = "135";
    process.env.GITHUB_CLIENT_ID = GITHUB_CLIENT_ID;
    process.env.GITHUB_CLIENT_SECRET = GITHUB_CLIENT_SECRET;

    beforeEach(() => {
      text.mockResolvedValue(JSON.stringify(expectedResponse));
      // @ts-ignore next-line
      mockFetch.mockResolvedValue({ ok: true, text } as Response);
    });

    afterAll(() => {
      process.env.GITHUB_CLIENT_ID = "";
      process.env.GITHUB_CLIENT_SECRET = "";
    });

    it("calls node-fetch with the expected arguments", async () => {
      await api.fetchAccessToken(code);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
        }
      );
    });

    it("returns a valid github token when the api call succeeds", async () => {
      const token = await api.fetchAccessToken(code);
      expect(token).toBe(expectedToken);
    });

    it("throws an error when the api call fails", async () => {
      const status = 404;
      // @ts-ignore next-line
      mockFetch.mockResolvedValue({ ok: false, status });
      const err = await api.fetchAccessToken(code).catch((e) => {
        return e;
      });
      expect(err instanceof FailedGithubRequest).toBe(true);
      expect(err.status).toBe(status);
    });

    it("throws an InvalidGithubToken error when the response is empty", async () => {
      text.mockResolvedValue("");
      const err = await api.fetchAccessToken(code).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubToken).toBe(true);
    });

    it("throws an InvalidGithubToken error when the response is missing required properties", async () => {
      text.mockResolvedValue(
        cloneWithoutProps(expectedResponse, ["access_token"], parseGithubToken)
      );
      const err = await api.fetchAccessToken(code).catch((e) => {
        return e;
      });
      expect(err instanceof InvalidGithubToken).toBe(true);
    });
  });
});

function cloneWithoutProps<T>(
  obj: T,
  props: string[],
  parser: (_: string) => T | undefined
): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clone: any = parser(JSON.stringify(obj));
  for (const prop of props) {
    delete clone[prop];
  }
  return JSON.stringify(clone);
}
