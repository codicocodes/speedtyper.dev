import { useEffect } from "react";

export enum Keys {
  Tab = "Tab",
}

export const useKeyMap = (
  isActive: boolean,
  selectedKey: string | Array<string>,
  callback: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const { key: pressedKey } = e;
      if (Array.isArray(selectedKey) && !selectedKey.includes(pressedKey))
        return;
      if (typeof selectedKey === "string" && pressedKey !== selectedKey) return;
      e.preventDefault();
      callback();
    };

    if (window && document) {
      if (isActive) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      } else {
        document.removeEventListener("keydown", handleKeyDown);
      }
    }
  }, [isActive, callback, selectedKey]);
};
