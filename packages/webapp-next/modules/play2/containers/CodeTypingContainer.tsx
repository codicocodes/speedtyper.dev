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
import { useGameStore } from "../state/game-store";

interface CodeTypingContainerProps {
  filePath: string;
  language: string;
}

export function CodeTypingContainer({
  filePath,
  language,
}: CodeTypingContainerProps) {
  const isPlaying = useGameStore((state) => state.isPlaying)();
  const start = useGameStore((state) => state.start);
  useCodeStore((state) => state.code);
  const index = useCodeStore((state) => state.index);
  const char = useCodeStore((state) => state.currentChar)();
  const [rect, currentNodeRef] = useNodeRect<HTMLSpanElement>(char);
  const [inputRef, triggerFocus] = useFocusRef<HTMLTextAreaElement>();
  const handleKeyPress = useCodeStore((state) => state.handleKeyPress);

  useEffect(() => {
    if (!isPlaying && index > 0) {
      start();
    }
  }, [index, isPlaying, start]);
  return (
    <div className="relative" onClick={triggerFocus}>
      <div className="flex flex-col">
        <HiddenCodeInput
          hide={true}
          disabled={false}
          inputRef={inputRef}
          handleOnKeyUp={handleKeyPress}
        />
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
