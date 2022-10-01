import { useCodeStore } from "../state/code-store";

function isOnlySpace(str: string) {
  return str.trim().length === 0;
}

export function IncorrectChars() {
  const incorrectChars = useCodeStore((state) => state.incorrectChars);
  const charGroups = parseIncorrectCharGroups(incorrectChars());
  return (
    <>
      {charGroups.map((chars, index) => {
        const bgColor =
          isOnlySpace(chars) && chars.length > 1 ? "" : "bg-red-500";
        return (
          <span key={index} className={`${bgColor}`}>
            {chars}
          </span>
        );
      })}
    </>
  );
}

function parseIncorrectCharGroups(incorrectChars: string) {
  const incorrectLines = incorrectChars.split("\n").filter(Boolean);
  const charGroups = incorrectLines
    .map((line, lineIndex) => {
      const prefixLineBreak = lineIndex !== 0;
      const lineWithPrefix = prefixLineBreak ? "\n".concat(line) : line;
      // TODO: make ↵\n a constant somewhere which can be reused
      const subline = lineWithPrefix.replace(/\n/g, "↵\n").split(/(\s+)/);
      return subline.map((chars) => {
        return chars;
      });
    })
    .flat();
  return charGroups;
}
