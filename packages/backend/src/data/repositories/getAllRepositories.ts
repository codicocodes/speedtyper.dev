import { Repository } from "./model";

export async function getAllRepositories() {
  const repos = await Repository.find();
  return repos;
}
