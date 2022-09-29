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

interface CodeTypingContainerProps {
  code: string;
}

export function CodeTypingContainer({ code }: CodeTypingContainerProps) {
  useCodeStore((state) => state.initialize)(code);
  useCodeStore((state) => state.code);
  useCodeStore((state) => state.index);
  const char = useCodeStore((state) => state.currentChar)();
  const [rect, currentNodeRef] = useNodeRect<HTMLSpanElement>(char);
  const [inputRef, triggerFocus] = useFocusRef();
  const handleKeyPress = useCodeStore((state) => state.handleKeyPress);
  return (
    <div className="relative" onClick={triggerFocus}>
      <div className="flex flex-col">
        <HiddenCodeInput
          hide={true}
          disabled={false}
          inputRef={inputRef}
          handleOnKeyUp={handleKeyPress}
        />
        <SmoothCaret top={rect.top} left={rect.left} />
        <CodeArea language="go">
          <TypedChars />
          <IncorrectChars />
          <NextChar nextCharRef={currentNodeRef} />
          <UntypedChars />
        </CodeArea>
      </div>
    </div>
  );
}
