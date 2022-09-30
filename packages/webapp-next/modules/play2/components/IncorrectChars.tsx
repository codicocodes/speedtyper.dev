import { useCodeStore } from "../state/code-store";

function isOnlySpace(str: string) {
  return str.trim().length === 0;
}

export function IncorrectChars() {
  const incorrectChars = useCodeStore((state) => state.incorrectChars);
  const incorrectLines = incorrectChars().split("\n");
  return (
    <>
      {incorrectLines.map((line, index) => {
        const prefixLineBreak = index !== 0;
        const lineWithPrefix = prefixLineBreak ? "\n".concat(line) : line;
        const subline = lineWithPrefix.replace(/\n/g, "↵\n").split(/(\s+)/);
        return (
          <>
            {subline.map((chars) => {
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
      })}
    </>
  );
}
