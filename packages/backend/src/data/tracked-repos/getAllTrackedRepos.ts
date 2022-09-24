import { TrackedRepo } from "./model";

export async function getAllTrackedRepos() {
  const repos = await TrackedRepo.find();
  return repos;
}
