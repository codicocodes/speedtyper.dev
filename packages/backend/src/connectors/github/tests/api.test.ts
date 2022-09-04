import fetch from "node-fetch";

import GithubAPI from "../api";
import repository from "./mock-responses/repository";

jest.mock("node-fetch");

describe("GithubAPI", () => {
  const token = "asdf";
  let api = new GithubAPI(token);
  const mockFetch = fetch as MockedFunction<typeof fetch>;
  afterEach(() => {
    api = new GithubAPI(token);
  });

  const json = jest.fn() as MockedFunction<any>;

  json.mockResolvedValue(repository); //just sample expected json return value

  mockFetch.mockResolvedValue({ ok: true, json } as Response); //just sample expected fetch response

  describe("when fetchRepository is called", () => {
    const repoSlug = "phaazon/luminance-rs";
    it("calls node-fetch with the expected arguments", async () => {
      await api.fetchRepository(repoSlug);
      expect(
        mockFetch
      ).toHaveBeenCalledWith(
        "https://api.github.com/repos/phaazon/luminance-rs",
        { headers: { Authorization: `token ${token}` } }
      );
    });
  });
});
