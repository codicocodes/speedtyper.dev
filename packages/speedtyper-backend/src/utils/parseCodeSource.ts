import parser from "../parser";
import { IParsedCode } from "../types";
import { ICodeSource } from "../models/CodeSource";

export default (codeSource: ICodeSource): IParsedCode[] => {
  const codeSnippets = parser(
    codeSource.githubCodeString ?? "",
    codeSource.language
  );

  const processedCodes: IParsedCode[] = [];
  codeSnippets.forEach(({ snippet, type }) => {
    try {
      processedCodes.push({
        fullCodeString: snippet,
        type,
      });
    } catch (error) {
      console.log({ error, snippet });
    }
  });

  return processedCodes;
};
