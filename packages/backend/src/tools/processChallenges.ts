import { connectToDB } from "../db";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import Challenge, { ChallengeDoc } from "../models/challenge";
import CodeSource, { CodeSourceDoc } from "../models/CodeSource";
import { ICodeSource } from "../models/CodeSource";
import parseCodeSource from "../utils/parseCodeSource";

const processChallenges = async () => {
  await connectToDB();
  try {
    const allCodeSources: CodeSourceDoc[] = await CodeSource.find({
      parsed: false,
    });

    const challengeDocs = [];

    console.log(`${allCodeSources.length} code sources to seed...`);

    for (const codeSource of allCodeSources) {
      const parsedChallengeDocs = parseCodeSource(
        codeSource.toObject() as ICodeSource
      );

      for (const parsedChallengeDoc of parsedChallengeDocs) {
        const codeSourceObj = codeSource.toObject();

        delete codeSourceObj._id;

        const challenge = new Challenge({
          ...codeSourceObj,
          ...parsedChallengeDoc,
        });

        challengeDocs.push(challenge);
      }
    }
    console.log("Everything is processed...");

    console.log(`${challengeDocs.length} challenges to insert...`);

    await Challenge.insertMany(challengeDocs as ChallengeDoc[]);

    console.log(`${challengeDocs.length} challenges created`);

    await CodeSource.updateMany({ parsed: false }, { $set: { parsed: true } });
  } catch (error) {
    console.log("error is here", error);
  }
  process.exit(0);
};

processChallenges();
