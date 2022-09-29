import { useEffect } from "react";

const SMOOTH_CARET_ELEMENT_ID = "smooth-caret-element";

export const SmoothCaret = ({ top, left }: { top: number; left: number }) => {
  useEffect(() => {
    animateToPosition(SMOOTH_CARET_ELEMENT_ID, { left, top });
  }, [left, top]);
  return (
    <div
      id={`${SMOOTH_CARET_ELEMENT_ID}`}
      className={`absolute bg-purple-400 rounded-lg`}
      style={{
        height: "28px",
        width: "2px",
      }}
    />
  );
};

function animateToPosition(
  elementId: string,
  rect: { left: number; top: number }
) {
  const element = document.getElementById(elementId);
  if (!element) return;
  const left = rect.left - 2 + "px";
  const top = rect.top - 5 + "px";
  element.style.top = top + "px";
  const caretAnimation = element.animate([{ left, top }], {
    easing: "linear",
    duration: 100,
    iterations: 1,
  });
  caretAnimation.onfinish = () => {
    element.style.left = left;
    element.style.top = top;
  };
}
