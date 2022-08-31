import CodeSource, { CodeSourceDoc } from "../models/CodeSource";

import ky from "ky-universal";

const fetchCodeSources = (): Promise<any> => {
  const url = "https://codicocodes.github.io/speedtyper-community/index.json";
  return ky.get(url).json();
};

const seedCodeSources = async () => {
  const rawCodeSources = await fetchCodeSources();

  const codeSourceDocs = rawCodeSources.map(
    (codeSource: any) => new CodeSource(codeSource)
  );

  await CodeSource.insertMany(codeSourceDocs, {
    ordered: false,
  }).catch(() => {});

  const unscrapedCodeSources: CodeSourceDoc[] = await CodeSource.find({
    githubCodeString: undefined,
  });

  if (unscrapedCodeSources.length === 0) {
    console.log("No codesources to scrape");
    return;
  }

  console.log(`Scraping ${unscrapedCodeSources.length} new codesources`);

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
};

export default seedCodeSources;
