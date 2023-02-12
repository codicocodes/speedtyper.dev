import { AnimatePresence, motion } from "framer-motion";
import { useNodeRect } from "../hooks/useNodeRect";
import { useCodeStore } from "../state/code-store";
import {
  useBlinkingCursorAnimation,
  OFF_WHITE_COLOR as GRAY_COLOR,
  SmoothCaret,
} from "./SmoothCaret";

interface NextCharProps {
  focused: boolean;
}

export function NextChar({ focused }: NextCharProps) {
  const useSmoothCaret = true;
  const index = useCodeStore((state) => state.index);
  const [{ top, left }, nextCharRef] = useNodeRect<HTMLSpanElement>(
    index.toString()
  );
  const getNextChar = useCodeStore((state) => state.currentChar);
  const nextChar = getNextChar().replace(/\n/g, "↵\n");
  const runBlinkingCursorAnimation = !useSmoothCaret;
  const controls = useBlinkingCursorAnimation(
    GRAY_COLOR,
    runBlinkingCursorAnimation
  );

  return (
    <AnimatePresence>
      <motion.span
        ref={nextCharRef}
        animate={controls}
        className="rounded-sm pb-1 pt-2"
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        {focused && useSmoothCaret && <SmoothCaret top={top} left={left} />}
        {nextChar}
      </motion.span>
    </AnimatePresence>
  );
}
