import { useEffect, useMemo, useState } from "react";

const SMOOTH_CARET_ELEMENT_ID = "smooth-caret-element";

export const SmoothCaret = ({ top, left }: { top: number; left: number }) => {
  const [hidden, setHidden] = useState(true);

  const animator = useAnimator();

  useEffect(() => {
    if (!isInitialPosition({ top, left })) {
      animator.animate({ left, top });
      setHidden(false);
    }
  }, [animator, left, top]);
  return (
    <div
      hidden={hidden}
      id={`${SMOOTH_CARET_ELEMENT_ID}`}
      className={`absolute bg-purple-400 rounded-lg`}
      style={{
        height: "28px",
        width: "2px",
      }}
    />
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
    const left = rect.left - 2 + "px";
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
