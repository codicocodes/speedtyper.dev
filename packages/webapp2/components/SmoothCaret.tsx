import React, { useEffect } from "react";

export default ({
  nextCharRef,
  inputIsSelected,
}: {
  nextCharRef: React.MutableRefObject<any>;
  inputIsSelected: boolean;
}) => {
  const left = (nextCharRef?.current?.offsetLeft ?? 0) - 2 + "px";
  const top = (nextCharRef?.current?.offsetTop ?? 0) - 5 + "px";

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
    nextCharRef.current && (
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
    )
  );
};
