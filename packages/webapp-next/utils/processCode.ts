import { IChar, IProcessedCode } from "../types";

/* 
    This function is based on: https://j11y.io/javascript/removing-comments-in-javascript/
*/

const skippableChar = (charStrings: IChar[], index: number) => {
  const char = charStrings[index]?.value;
  const charIsSpace = char === " ";
  const prevChar = charStrings[index - 1]?.value;
  const nextChar = charStrings[index + 1]?.value;

  const isSkippableChar =
    charIsSpace && (char === prevChar || char === nextChar);

  return isSkippableChar;
};

export default (chars: string): IProcessedCode => {
  const calculateSkippable = (i: number) => {
    if (firstCharIndex === i && updatedChars[i]?.value === "\n") {
      updatedChars[i].skipped = true;
    }

    if (i === firstCharIndex) {
      updatedChars[i].isNextChar = true;
    }

    if (updatedChars[i].skipped && updatedChars[i].isNextChar) {
      updatedChars[i].isNextChar = false;
      updatedChars[i + 1].isNextChar = true;
      firstCharIndex = i + 1;
    }
    updatedChars[i].skipped =
      updatedChars[i].skipped || skippableChar(updatedChars, i);

    if (!updatedChars[i].skipped) {
      strippedCode = strippedCode + updatedChars[i].value;
    }
  };

  if (!chars) return { chars: [], code: "", index: 0 };

  let mode = {
    singleQuote: false,
    doubleQuote: false,
    regex: false,
    blockComment: false,
    lineComment: false,
    condComp: false,
  };

  let firstCharIndex = 0;

  let strippedCode = "";

  let updatedChars: IChar[] = chars.split("").map((value) => ({
    isTyped: false,
    isCorrect: false,
    isNextChar: false,
    value,
    arrayIndex: i,
    skipped: false,
  }));

  for (var i = 0, l = chars.length; i < l; i++) {
    if (mode.regex) {
      if (
        updatedChars[i]?.value === "/" &&
        updatedChars[i - 1]?.value !== "\\"
      ) {
        mode.regex = false;
      }
      calculateSkippable(i);
      continue;
    }

    if (mode.singleQuote) {
      if (chars[i] === "'" && chars[i - 1] !== "\\") {
        mode.singleQuote = false;
      }
      calculateSkippable(i);
      continue;
    }

    if (mode.doubleQuote) {
      if (
        updatedChars[i]?.value === '"' &&
        updatedChars[i - 1]?.value !== "\\"
      ) {
        mode.doubleQuote = false;
      }
      calculateSkippable(i);
      continue;
    }

    if (mode.blockComment) {
      if (
        updatedChars[i]?.value === "*" &&
        updatedChars[i + 1]?.value === "/"
      ) {
        updatedChars[i + 1].skipped = true;
        mode.blockComment = false;
      }
      updatedChars[i].skipped = true;

      if (i > firstCharIndex) {
        calculateSkippable(i);
        continue;
      }
    }

    if (mode.lineComment) {
      if (
        updatedChars[i + 1]?.value === "n" ||
        updatedChars[i + 1]?.value === "r"
      ) {
        mode.lineComment = false;
      }
      updatedChars[i].skipped = true;
      calculateSkippable(i);
      continue;
    }

    if (mode.condComp) {
      if (
        updatedChars[i - 2]?.value === "@" &&
        updatedChars[i - 1]?.value === "*" &&
        updatedChars[i]?.value === "/"
      ) {
        mode.condComp = false;
      }
      calculateSkippable(i);
      continue;
    }

    mode.doubleQuote = updatedChars[i]?.value === '"';
    mode.singleQuote = updatedChars[i]?.value === "'";

    if (updatedChars[i]?.value === "/") {
      if (
        updatedChars[i + 1]?.value === "*" &&
        updatedChars[i + 2]?.value === "@"
      ) {
        mode.condComp = true;
        calculateSkippable(i);
        continue;
      }
      if (updatedChars[i + 1]?.value === "*") {
        updatedChars[i].skipped = true;
        mode.blockComment = true;
        calculateSkippable(i);
        continue;
      }
      if (updatedChars[i + 1]?.value === "/") {
        updatedChars[i].skipped = true;
        mode.lineComment = true;
        calculateSkippable(i);
        continue;
      }
      mode.regex = true;
    }

    calculateSkippable(i);
  }

  return { chars: updatedChars, code: strippedCode, index: firstCharIndex };
};
