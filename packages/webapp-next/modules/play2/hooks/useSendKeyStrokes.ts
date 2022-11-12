import { useEffect, useState } from "react";
import { Game } from "../services/Game";
import { useCodeStore } from "../state/code-store";

export function useSendKeyStrokes(game: Game) {
  const [lastCorrectIndex, setLastCorrectIndex] = useState(-1);
  const correctIndex = useCodeStore((state) => state.correctIndex);
  const keyStrokes = useCodeStore((state) => state.keyStrokes);
  const hasKeyStrokes = keyStrokes.length > 0;

  useEffect(() => {
    if (hasKeyStrokes) {
      const lastKeyStroke = keyStrokes[keyStrokes.length - 1];
      if (lastKeyStroke.index === lastCorrectIndex) {
        return;
      }
      game.sendKeyStroke(lastKeyStroke);
      setLastCorrectIndex(lastKeyStroke.index);
    }
  }, [lastCorrectIndex, correctIndex, game, hasKeyStrokes, keyStrokes]);
}
