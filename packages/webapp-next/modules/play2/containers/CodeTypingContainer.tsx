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

interface CodeTypingContainerProps {
  code: string;
  filePath: string;
  language: string;
  setIsTyping: (isTyping: boolean) => void;
}

export function CodeTypingContainer({
  code,
  filePath,
  language,
  setIsTyping,
}: CodeTypingContainerProps) {
  const initialize = useCodeStore((state) => state.initialize);
  useCodeStore((state) => state.code);
  const index = useCodeStore((state) => state.index);
  const char = useCodeStore((state) => state.currentChar)();
  const [rect, currentNodeRef] = useNodeRect<HTMLSpanElement>(char);
  const [inputRef, triggerFocus] = useFocusRef<HTMLTextAreaElement>();
  const handleKeyPress = useCodeStore((state) => state.handleKeyPress);

  useEffect(() => {
    initialize(code);
  }, [initialize, code, setIsTyping]);
  useEffect(() => {
    setIsTyping(index > 0);
  }, [index, setIsTyping]);
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
