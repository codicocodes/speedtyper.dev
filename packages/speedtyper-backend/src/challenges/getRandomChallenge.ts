import Challenge from "../models/challenge";
import { IChallenge } from "../types";

export default async function getRandomChallenge(
  language: string | null
): Promise<IChallenge> {
  console.time("getRandomChallenge");

  const agg = await Challenge.aggregate([
    { $match: language ? { language } : {} },
    { $sample: { size: 1 } },
  ]);

  const randomChallenge = agg?.[0];

  if (!randomChallenge) {
    throw new Error("No challenge found..");
  }

  randomChallenge.fullCodeString = randomChallenge.fullCodeString.replace(
    /\t/g,
    "  "
  );

  console.timeEnd("getRandomChallenge");

  return { ...randomChallenge, startIndex: 0 };
}

// take a look at Kommentary, native nvim version of vim commentary! @glacion
// native LSP inside nvim 0.5 -> tsserver  that is actually getting the errors
