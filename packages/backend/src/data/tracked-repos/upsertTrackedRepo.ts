import { TrackedRepo } from "./model";

export async function upsertTrackedRepo(slug: string) {
  const repo = await TrackedRepo.findOneAndUpdate(
    { slug },
    { slug },
    {
      new: true,
      upsert: true,
      useFindAndModify: false,
    }
  );
  return repo;
}
