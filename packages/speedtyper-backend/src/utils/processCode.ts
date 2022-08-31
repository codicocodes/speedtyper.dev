import NodeCache from "node-cache";
import { IChar, IProcessedCode } from "../types";

/* 
    This function is based on: https://j11y.io/javascript/removing-comments-in-javascript/
*/

function skippableChar(charStrings: IChar[], index: number) {
  const char = charStrings[index]?.value;
  const charIsSpace = char === " ";
  const prevChar = charStrings[index - 1]?.value;
  const nextChar = charStrings[index + 1]?.value;

  const isSkippableChar =
    charIsSpace && (char === prevChar || char === nextChar);

  return isSkippableChar;
}

const processCodeCache = new NodeCache({ stdTTL: 60 * 20 });

export default (fullCodeString: string): IProcessedCode => {
  console.time("processCode");
  let challengeMetaData = processCodeCache.get(fullCodeString);

  if (challengeMetaData) {
    return challengeMetaData as IProcessedCode;
  }
  challengeMetaData = processCode(fullCodeString);
  processCodeCache.set(fullCodeString, challengeMetaData);
  console.timeEnd("processCode");

  return challengeMetaData as IProcessedCode;
};

const processCode = (fullCodeString: string): IProcessedCode => {
  let strippedCode = "";

  const updatedChars: IChar[] = fullCodeString.split("").map((value) => ({
    isNextChar: false,
    value,
    skipped: false,
  }));

  const splitCodeStrings = fullCodeString.split("\n");

  let i = 0;

  for (let lineCode of splitCodeStrings) {
    let foundNonSkippedChar = false;
    lineCode = lineCode.concat("\n");
    for (let char of lineCode.split("")) {
      let skipped = false;
      if (!foundNonSkippedChar) {
        skipped = skippableChar(updatedChars, i);
        if (!skipped) {
          foundNonSkippedChar = true;
        }
      }
      if (updatedChars[i]) {
        updatedChars[i].skipped = skipped;
      }

      if (!skipped) {
        strippedCode = strippedCode.concat(char);
      }
      i++;
    }
  }

  return {
    chars: updatedChars,
    strippedCode,
  };
};
