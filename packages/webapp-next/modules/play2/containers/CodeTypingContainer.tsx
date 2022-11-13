import { useFocusRef } from "../hooks/useFocusRef";
import { useNodeRect } from "../hooks/useNodeRect";
import { useCodeStore } from "../state/code-store";
import { CodeArea } from "../components/CodeArea";
import { HiddenCodeInput } from "../components/HiddenCodeInput";
import { SmoothCaret } from "../components/SmoothCaret";
import { TypedChars } from "../components/TypedChars";
import { NextChar } from "../components/NextChar";
import { IncorrectChars } from "../components/IncorrectChars";
import { UntypedChars } from "../components/UntypedChars";
import { useEffect, useState, useCallback, MouseEvent } from "react";
import { useIsPlaying } from "../../../common/hooks/useIsPlaying";
import { useKeyMap } from "../../../hooks/useKeyMap";

interface CodeTypingContainerProps {
  filePath: string;
  language: string;
}

const triggerKeys = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*() ".split("");

const CODE_INPUT_BLUR_DEBOUNCE_MS = 1000;

let trulyFocusedCodeInput = true;

export function CodeTypingContainer({
  filePath,
  language,
}: CodeTypingContainerProps) {
  useCodeStore((state) => state.code);
  const isPlaying = useIsPlaying();
  const code = useCodeStore((state) => state.code);
  const start = useCodeStore((state) => state.start);
  const index = useCodeStore((state) => state.index);
  const [rect, currentNodeRef] = useNodeRect<HTMLSpanElement>(index.toString());
  const [inputRef, triggerFocus] = useFocusRef<HTMLTextAreaElement>();
  const [focused, setFocused] = useState(true);

  useKeyMap(!focused, triggerKeys, () => {
    triggerFocus();
    setFocused(true);
  });

  useEffect(() => {
    triggerFocus();
  }, [code, triggerFocus]);

  useEffect(() => {
    if (!isPlaying && index > 0) {
      start();
    }
  }, [index, isPlaying, start]);

  const onFocus = useCallback(() => {
    trulyFocusedCodeInput = true;
    setFocused(true);
  }, [setFocused]);

  const onBlur = useCallback(() => {
    trulyFocusedCodeInput = false;
    setTimeout(() => {
      if (!trulyFocusedCodeInput) {
        setFocused(false);
      }
    }, CODE_INPUT_BLUR_DEBOUNCE_MS);
  }, [setFocused]);

  // onBlur gets triggered when onFocus is also called more than once
  // which caused a flicker when you repeatedly click the code area
  // this will prevent onBlur from getting called repeatedly
  // Ref: https://github.com/react-toolbox/react-toolbox/issues/1323#issuecomment-656778859
  const onMouseDownPreventBlur = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
    },
    []
  );

  return (
    <div className="w-full relative" onClick={triggerFocus}>
      <div
        className="flex flex-col w-full"
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDownPreventBlur}
      >
        <HiddenCodeInput hide={true} disabled={false} inputRef={inputRef} />
        <CodeArea language={language} filePath={filePath} focused={focused}>
          {focused && <SmoothCaret top={rect.top} left={rect.left} />}
          <TypedChars />
          <IncorrectChars />
          <NextChar nextCharRef={currentNodeRef} />
          <UntypedChars />
        </CodeArea>
      </div>
    </div>
  );
}
