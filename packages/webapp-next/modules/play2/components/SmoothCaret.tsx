import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCodeStore } from "../state/code-store";

const SMOOTH_CARET_ELEMENT_ID = "smooth-caret-element";

const useBlinkingCursorAnimation = () => {
  const controls = useAnimationControls();
  const isPlaying = useCodeStore((state) => state.isPlaying)();
  useEffect(() => {
    if (!isPlaying) {
      controls.start({
        backgroundColor: ["rgba(0,0,0,0)", "#d6bcfa"],
      });
    } else {
      controls.set({
        backgroundColor: ["rgba(0,0,0,0)", "#d6bcfa"],
      });
      controls.stop();
    }
  }, [controls, isPlaying]);
  return controls;
};

export const SmoothCaret = ({ top, left }: { top: number; left: number }) => {
  // TODO: make caret blink when not actively playing
  const [hidden, setHidden] = useState(true);
  const animator = useAnimator();

  useEffect(() => {
    if (!isInitialPosition({ top, left })) {
      animator.animate({ left, top });
      setHidden(false);
    }
  }, [animator, left, top]);

  const controls = useBlinkingCursorAnimation();

  return (
    <AnimatePresence>
      <motion.div
        animate={controls}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        hidden={hidden}
        id={`${SMOOTH_CARET_ELEMENT_ID}`}
        className={`absolute rounded-lg`}
        // className={`absolute bg-purple-400 rounded-lg`}
        style={{
          height: "34px",
          width: "3px",
        }}
      />
    </AnimatePresence>
  );
};

function isInitialPosition(rect: { left: number; top: number }) {
  return rect.top === 0 && rect.left === 0;
}

function useAnimator() {
  return useMemo(() => {
    return new Animator(SMOOTH_CARET_ELEMENT_ID);
  }, []);
}

class Animator {
  private element: HTMLElement | null;
  constructor(private elementId: string) {
    this.element = null;
  }

  private getElement() {
    if (this.element) {
      return this.element;
    }
    this.element = document.getElementById(this.elementId);
    return this.element;
  }

  private elementInStarterPosition(element: HTMLElement) {
    const left = element.style.left;
    const top = element.style.top;
    return left === "" || top === "";
  }

  animate(rect: { left: number; top: number }) {
    const element = this.getElement();
    if (!element) return;
    const left = rect.left - 4 + "px";
    const top = rect.top - 5 + "px";
    const duration = this.elementInStarterPosition(element) ? 0 : 100;
    const caretAnimation = element.animate([{ left, top }], {
      easing: "linear",
      duration,
      iterations: 1,
    });
    caretAnimation.onfinish = () => {
      element.style.left = left;
      element.style.top = top;
    };
  }
}
