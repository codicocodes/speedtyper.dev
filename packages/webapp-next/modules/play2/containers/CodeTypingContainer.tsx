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
import { useEffect } from "react";
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

  useEffect(() => {
    if (!isPlaying && index > 0) {
      start();
    }
  }, [index, isPlaying, start]);

  return (
    <div className="w-full relative" onClick={triggerFocus}>
      <div className="flex flex-col w-full">
        <HiddenCodeInput hide={true} disabled={false} inputRef={inputRef} />
        {/* TODO: hide caret when input is not focused */}
        <SmoothCaret top={rect.top} left={rect.left} />
        <CodeArea language={language} filePath={filePath}>
          <TypedChars />
          <IncorrectChars />
          <NextChar nextCharRef={currentNodeRef} />
          <UntypedChars />
        </CodeArea>
      </div>
    </div>
  );
}
