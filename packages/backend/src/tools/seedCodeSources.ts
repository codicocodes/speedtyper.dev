import ky from "ky-universal";
import dotenv from "dotenv";
import path from "path";

import CodeSource, { CodeSourceDoc } from "../models/CodeSource";
import { connectToDB } from "../db";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const fetchCodeSources = (): Promise<any> => {
  const url = "https://codicocodes.github.io/speedtyper-community/index.json";
  return ky.get(url).json();
};

const seedCodeSources = async () => {
  await connectToDB();
  const rawCodeSources = await fetchCodeSources();

  const codeSourceDocs = rawCodeSources.map(
    (codeSource: any) => new CodeSource(codeSource)
  );

  await CodeSource.insertMany(codeSourceDocs, {
    ordered: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }).catch(() => {});

  const unscrapedCodeSources: CodeSourceDoc[] = await CodeSource.find({
    githubCodeString: undefined,
  });

  if (unscrapedCodeSources.length === 0) {
    return;
  }

  await Promise.all(
    unscrapedCodeSources.map(async (codeSource) => {
      return ky
        .get(codeSource.source)
        .text()
        .then((githubCodeString) => {
          codeSource.set({ githubCodeString });
          return codeSource.save();
        })
        .catch((e) => {
          if (e.message?.toLowerCase() === "not found") {
            console.log(codeSource.name, e.message);
          }
        });
    })
  );
  process.exit(0);
};

seedCodeSources();
