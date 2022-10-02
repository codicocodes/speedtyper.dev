import React, { useEffect } from "react";

const SmoothCaret = ({
  nextCharRef,
  inputIsSelected,
}: {
  nextCharRef: React.RefObject<HTMLSpanElement>;
  inputIsSelected: boolean;
}) => {
  const left = (nextCharRef.current?.offsetLeft ?? 0) - 2 + "px";
  const top = (nextCharRef.current?.offsetTop ?? 0) - 5 + "px";

  useEffect(() => {
    const element = document.getElementById("caret");

    if (element) {
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
  }, [left, top]);

  return (
    <div
      id="caret"
      className={`${
        inputIsSelected ? "" : "hidden"
      } absolute bg-purple-400 rounded-lg`}
      style={{
        height: "32px",
        width: "2.5px",
      }}
    ></div>
  );
};

export default SmoothCaret;
