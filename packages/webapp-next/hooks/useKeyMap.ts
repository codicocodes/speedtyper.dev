import { useEffect, useState } from "react";

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
  const [capsLockActive, setCapsLockActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key: pressedKey } = e;
      if (pressedKey === "CapsLock") {
        setCapsLockActive(!capsLockActive);
      }
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

    const handleCapsLock = (e: KeyboardEvent) => {
      setCapsLockActive(e.getModifierState("CapsLock"));
    };

    if (window && document) {
      if (isActive) {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keydown", handleCapsLock);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.removeEventListener("keydown", handleCapsLock);
        };
      } else {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keydown", handleCapsLock);
      }
    }
  }, [isActive, callback, selectedKeys, capsLockActive]);

  return { capsLockActive };
};
