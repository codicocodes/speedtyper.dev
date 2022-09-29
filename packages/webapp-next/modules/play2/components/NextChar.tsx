import { useCodeStore } from "../state/code-store";

export function NextChar({
  nextCharRef,
}: {
  nextCharRef: (node: HTMLSpanElement) => void;
}) {
  const nextChar = useCodeStore((state) => state.currentChar);
  return <span ref={nextCharRef}>{nextChar().replace(/\n/g, "↵\n")}</span>;
}
