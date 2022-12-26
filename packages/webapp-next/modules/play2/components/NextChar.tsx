import { AnimatePresence, motion } from "framer-motion";
import { useCodeStore } from "../state/code-store";
import {
  useBlinkingCursorAnimation,
  OFF_WHITE_COLOR as GRAY_COLOR,
} from "./SmoothCaret";

export function NextChar({
  nextCharRef,
}: {
  nextCharRef: (node: HTMLSpanElement) => void;
}) {
  const getNextChar = useCodeStore((state) => state.currentChar);
  const nextChar = getNextChar().replace(/\n/g, "↵\n");
  const runBlinkingCursorAnimation = false;
  const controls = useBlinkingCursorAnimation(
    GRAY_COLOR,
    runBlinkingCursorAnimation
  );

  return (
    <AnimatePresence>
      <motion.span
        ref={nextCharRef}
        animate={controls}
        className="rounded-sm"
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        {nextChar}
      </motion.span>
    </AnimatePresence>
  );
}
