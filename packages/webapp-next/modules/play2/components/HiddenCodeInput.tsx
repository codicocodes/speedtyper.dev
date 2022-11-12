import {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  MouseEvent,
  useState,
} from "react";

import { TrackedKeys, useCodeStore } from "../state/code-store";

interface HiddenCodeInputProps {
  hide: boolean; // Used for debugging the input
  disabled: boolean;
  inputRef: (node: HTMLTextAreaElement) => void;
}

export const HiddenCodeInput = ({
  disabled,
  hide,
  inputRef,
}: HiddenCodeInputProps) => {
  const handleKeyPress = useCodeStore((state) => state.handleKeyPress);

  // TODO: remove input and setInput
  // instead introduc getTypedInput method in the store
  // which gets code.substr(0, correctIndex)
  const [input, setInput] = useState("");

  function handleOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
    // TODO: use e.isTrusted
    const backspaces = input.length - e.target.value.length;
    // send backspaces
    if (backspaces > 0) {
      for (let i = 1; i <= backspaces; i++) {
        handleKeyPress(TrackedKeys.Backspace);
      }
    } else {
      // send regular characters
      const typed = e.target.value.substring(input.length);
      for (const char of typed) {
        handleKeyPress(char);
      }
    }
    setInput(e.target.value);
  }

  return (
    <textarea
      className="text-black"
      ref={inputRef}
      value={input}
      autoFocus
      disabled={disabled}
      onChange={handleOnChange}
      onKeyDown={preventArrowKeys}
      onClick={preventClick}
      onPaste={preventPaste}
      style={{
        ...(hide
          ? {
              position: "absolute",
              left: "-10000000px",
            }
          : {}),
      }}
    />
  );
};

function preventClick(e: MouseEvent<HTMLTextAreaElement>) {
  e.preventDefault();
}

function preventPaste(e: ClipboardEvent<HTMLTextAreaElement>) {
  e.preventDefault();
}

function preventArrowKeys(e: KeyboardEvent<HTMLTextAreaElement>) {
  switch (e.key) {
    case ArrowKey.Up:
    case ArrowKey.Down:
    case ArrowKey.Left:
    case ArrowKey.Right:
      e.preventDefault();
  }
}

enum ArrowKey {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}
