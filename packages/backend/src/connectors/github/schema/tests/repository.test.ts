import repository from "../../tests/mock-responses/repository";
import { parseGithubRepository } from "../repository";

describe("parseGithubRepository", () => {
  describe("when the input is invalid", () => {
    it("returns undefined", () => {
      const githubRepository = parseGithubRepository("{}");
      expect(githubRepository).toBeUndefined();
    });
  });
  describe("when the input is valid", () => {
    it("returns a github repository", () => {
      const githubRepository = parseGithubRepository(
        JSON.stringify(repository)
      );
      expect(githubRepository).not.toBeUndefined();
    });
  });
});
