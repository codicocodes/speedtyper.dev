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

interface CodeTypingContainerProps {
  filePath: string;
  language: string;
}

export function CodeTypingContainer({
  filePath,
  language,
}: CodeTypingContainerProps) {
  useCodeStore((state) => state.code);
  const isPlaying = useIsPlaying();
  const start = useCodeStore((state) => state.start);
  const index = useCodeStore((state) => state.index);
  const char = useCodeStore((state) => state.currentChar)();
  const [rect, currentNodeRef] = useNodeRect<HTMLSpanElement>(char);
  const [inputRef, triggerFocus] = useFocusRef<HTMLTextAreaElement>();
  const [focused, setFocused] = useState(true);

  useEffect(() => {
    if (!isPlaying && index > 0) {
      start();
    }
  }, [index, isPlaying, start]);

  const onFocus = useCallback(() => setFocused(true), [setFocused]);

  const onBlur = useCallback(() => setFocused(false), [setFocused]);

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
        {/* TODO: hide caret when input is not focused */}
        {focused && <SmoothCaret top={rect.top} left={rect.left} />}
        <CodeArea language={language} filePath={filePath} focused={focused}>
          <TypedChars />
          <IncorrectChars />
          <NextChar nextCharRef={currentNodeRef} />
          <UntypedChars />
        </CodeArea>
      </div>
    </div>
  );
}
