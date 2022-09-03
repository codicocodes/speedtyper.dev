import { useEffect, useState, useRef } from "react";

export default () => {
  const [focusCodeArea, setFocusCodeArea] = useState(true);

  const ref = useRef(focusCodeArea);

  useEffect(() => {
    ref.current = focusCodeArea;
}, [focusCodeArea]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e) {
      const key = e.key;
      if (key === "Tab") {
        setFocusCodeArea(!ref.current);
      }
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return focusCodeArea;
};
