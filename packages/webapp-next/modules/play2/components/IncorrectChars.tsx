import { useCodeStore } from "../state/code-store";

export function IncorrectChars() {
  const incorrectChars = useCodeStore((state) => state.incorrectChars);
  return <span className="bg-red-500">{incorrectChars()}</span>;
}
