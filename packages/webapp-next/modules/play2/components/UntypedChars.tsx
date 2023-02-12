import { useCodeStore } from "../state/code-store";
export function UntypedChars() {
  const untypedChars = useCodeStore((state) => state.untypedChars);
  return <>{untypedChars()}</>;
}
