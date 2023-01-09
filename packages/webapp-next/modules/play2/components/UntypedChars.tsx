import { useCodeStore } from "../state/code-store";
const splitChar = "‎";
export function UntypedChars() {
  const untypedChars = useCodeStore((state) => state.untypedChars);
  return (
    <>
      {untypedChars()
        .split("")
        .join(splitChar)
        .split("")
        .map((c, i) => (
          <span key={i}>{c}</span>
        ))}
    </>
  );
}
