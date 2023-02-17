import { useEffect } from "react";

export enum Keys {
  Tab = "Tab",
  Enter = "Enter",
  Escape = "Escape",
}

export const triggerKeys = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*() ";

export const useKeyMap = (
  isActive: boolean,
  selectedKeys: string,
  callback: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const { key: pressedKey } = e;
      if (
        Object.values(Keys)
          .map((en) => en.toString())
          .includes(selectedKeys)
      ) {
        if (pressedKey !== selectedKeys) return;
        e.preventDefault();
        callback();
        return;
      }
      if (!selectedKeys.includes(pressedKey)) return;
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
  }, [isActive, callback, selectedKeys]);
};
