import { GithubRepository } from "../../connectors/github/schema/repository";
import { Repository } from "./model";

export async function upsertRepository(slug: string, data: GithubRepository) {
  const input = {
    slug,
    htmlUrl: data.html_url,
    stars: data.stargazers_count,
    licenseName: data.license.name,
    ownerAvatar: data.owner.avatar_url,
    language: data.language,
    defaultBranch: data.default_branch,
  };
  const repo = await Repository.findOneAndUpdate({ slug }, input, {
    new: true,
    upsert: true,
    useFindAndModify: false,
  });
  return repo;
}
