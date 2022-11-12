import create from "zustand";
import { cpmToWPM } from "../../../common/utils/cpmToWPM";

export interface KeyStroke {
  key: string;
  timestamp: number;
  literal?: string;
  progress: number;
  index: number;
}

interface CodeState {
  // Match state
  startTime?: Date;
  endTime?: Date;
  keyStrokes: KeyStroke[];
  incorrectKeyStrokes: KeyStroke[];
  start: () => void;
  end: () => void;
  isPlaying: () => boolean;
  getTimeMS: () => number;
  getCPM: () => number;
  getMistakesCount: () => number;
  getAccuracy: () => number;
  getChartWPM: () => number[];
  _getValidKeyStrokes: () => KeyStroke[];
  _saveKeyStroke: (key: string, index: number, correct: boolean) => void;
  calculateProgress: (correct: boolean) => number;
  expectedMaxCorrectKeyStrokes: number;

  // Code rendering state
  code: string;
  index: number;
  correctIndex: number;
  correctChars: () => string;
  incorrectChars: () => string;
  currentChar: () => string;
  untypedChars: () => string;
  initialize: (code: string) => void;
  handleKeyPress: (key: string) => void;
  isCompleted: () => boolean;
  correctInput: () => string;
  literals: string[];

  // private helper methods
  _getBackspaceOffset: () => number;
  _getForwardOffset: () => number;
  _allCharsTyped: () => boolean;
  _buildLiterals: (code: string) => string[];
}

// There are 3 separate parts of logic in this store
// 1. Code rendering logic which is necessary to render the code strings
// 2. Match logic which concerns itself with maintaining the match
// 3. Results logic which shows data after the race
// Match logic depends on code rendering logic.
// Results logic depends on Match logic.
// Perhaps Match and results logic could be split into a separate store
// But this was a bit simpler as we can call _saveKeyStroke from the handleKeyPress method
// The other option would be to pass in the saveKeyStroke method into the handleKeyPress method

export const useCodeStore = create<CodeState>((set, get) => ({
  // RESULTS logic
  expectedMaxCorrectKeyStrokes: 0,
  getAccuracy: () => {
    // const allKeyStrokes = get().keyStrokes.length;
    const validKeyStrokes = get()._getValidKeyStrokes().length;
    // const invalidKeyStrokes = allKeyStrokes - validKeyStrokes;
    const mistakes = get().incorrectKeyStrokes.length;
    const accuracy = (validKeyStrokes - mistakes) / validKeyStrokes;
    return Math.floor(accuracy * 100);
  },
  getMistakesCount: () => {
    const mistakes = get().incorrectKeyStrokes;
    return mistakes.length;
  },
  getChartWPM: () => {
    const startTime = get().startTime?.getTime();
    if (!startTime) {
      return [];
    }
    const wpm = [];
    let count = 0;
    let seconds = 1;
    const validKeyStrokes = get()._getValidKeyStrokes();

    for (let i = 0; i < validKeyStrokes.length; i++) {
      const keyStroke = validKeyStrokes[i];
      const breaktime = startTime + seconds * 1000;
      const isLastKeyStroke = i === validKeyStrokes.length - 1;
      const diffMS = keyStroke.timestamp - breaktime;
      const diffSeconds = diffMS / 1000;
      if (keyStroke.timestamp > breaktime) {
        // If more than a second has passed since the last WPM calculation
        // we push another WPM calculation to the array
        const cpm = Math.floor((60 * count) / (seconds + diffSeconds));
        wpm.push(cpmToWPM(cpm));
        seconds++;
      } else if (isLastKeyStroke) {
        // if this is the last keystroke in the valid keystrokes array
        // we push the last uncounted characters as CPM to the array
        // even if we have not passed a full second
        const cpm = Math.floor((60 * count) / (seconds + diffSeconds));
        wpm.push(cpmToWPM(cpm));
        seconds++;
      }
      count++;
    }
    return wpm;
  },
  _getValidKeyStrokes: () => {
    const keyStrokes = get().keyStrokes;
    const validKeyStrokes = Object.values(
      Object.fromEntries(
        keyStrokes.map((keyStroke) => [keyStroke.index, keyStroke])
      )
    );
    return validKeyStrokes;
  },
  getTimeMS: () => {
    const end = get().endTime?.getTime();
    const start = get().startTime?.getTime();
    if (!start || !end) return 0;
    return end - start;
  },
  getCPM: () => {
    const validKeyStrokesCount = new Set(
      get().keyStrokes.map((keyStroke) => keyStroke.index)
    ).size;
    const now = new Date();
    const start = get().startTime ?? now;
    const end = get().endTime ?? now;
    const ms = end.getTime() - start.getTime();
    if (ms === 0) {
      return 0;
    }
    const seconds = ms / 1000;
    return Math.floor((60 * validKeyStrokesCount) / seconds);
  },

  // MATCH logic
  keyStrokes: [],
  incorrectKeyStrokes: [],
  _saveKeyStroke: (key: string, index: number, correct: boolean) => {
    set((state) => {
      const progress = get().calculateProgress(correct);
      if (correct) {
        state.keyStrokes.push({
          key,
          index,
          progress,
          timestamp: new Date().getTime(),
        });
      } else {
        state.incorrectKeyStrokes.push({
          key,
          index,
          progress,
          timestamp: new Date().getTime(),
        });
      }
      return state;
    });
  },
  calculateProgress: (correct: Boolean) => {
    const validKeyStrokesCount =
      get()._getValidKeyStrokes().length + Number(correct);
    const progress = Math.floor(
      (validKeyStrokesCount * 100) / get().expectedMaxCorrectKeyStrokes
    );
    return progress;
  },
  start: () => {
    set((state) => {
      return { ...state, startTime: new Date() };
    });
  },
  end: () => {
    set((state) => {
      return { ...state, endTime: new Date() };
    });
  },
  isPlaying: () => {
    return !!get().startTime && !get().endTime;
  },

  // CODE rendering logic
  literals: [],
  code: "",
  index: 0,
  correctIndex: 0,
  initialize: (code: string) => {
    set((state) => ({
      ...state,
      code,
      expectedMaxCorrectKeyStrokes: calculateExpectedMaxCorrectKeyStrokes(code),
      index: 0,
      correctIndex: 0,
      startTime: undefined,
      endTime: undefined,
      chars: [],
      keyStrokes: [],
      incorrectKeyStrokes: [],
      literals: get()._buildLiterals(code),
    }));
  },
  handleKeyPress: (unparsedKey: string) => {
    set((state) => {
      const key = parseKey(unparsedKey);
      if (isSkippable(key)) return state;
      if (isBackspace(key)) {
        const offset = state._getBackspaceOffset();
        const index = Math.max(state.index - offset, 0);
        const correctIndex = Math.min(index, state.correctIndex);
        return { ...state, index, correctIndex };
      }

      if (state._allCharsTyped()) return state;

      // handle non backspace
      const offset = state._getForwardOffset();
      const index = Math.min(offset + state.index, state.code.length);
      const correct =
        state.index === state.correctIndex && key === state.code[state.index];
      const correctIndex = !correct ? state.correctIndex : index;
      get()._saveKeyStroke(key, correctIndex, correct);
      return { ...state, index, correctIndex };
    });
  },
  correctChars: () => {
    return get().code.slice(0, get().correctIndex);
  },
  currentChar: () => {
    if (get().code.length <= get().index) {
      return "";
    }
    return get().code[get().index];
  },
  incorrectChars: () => {
    if (get().code.length <= get().index) {
      return get().code.slice(get().correctIndex);
    }
    return get().code.slice(get().correctIndex, get().index);
  },
  untypedChars: () => {
    if (get().code.length <= get().index) {
      return "";
    }
    return get().code.slice(get().index + 1);
  },
  correctInput: () => {
    return get().code.substring(0, get().correctIndex);
  },
  isCompleted: () => {
    return get().correctIndex > 0 && get().correctIndex === get().code.length;
  },
  _allCharsTyped: () => {
    return get().index === get().code.length;
  },
  _getForwardOffset: () => {
    let offset = 1;

    // if current char is a line break \n:
    if (isLineBreak(get().currentChar())) {
      // skip repeated spaces
      while (get().code[get().index + offset] === " ") {
        offset++;
      }
    }

    // TODO: move this logic to parsing in order to remove too many spaces
    // if next char and next next char are going to be a space:
    // else if (
    //   isSpace(get().code[get().index + 1]) &&
    //   isSpace(get().code[get().index + 2])
    // ) {
    //   // skip repeated spaces
    //   while (get().code[get().index + offset] === " ") {
    //     offset++;
    //   }
    // }

    return offset;
  },
  _getBackspaceOffset: () => {
    let offset = 1;
    // if previous char and previous previous char is a space:
    if (
      get().code[get().index - 1] === " " &&
      get().code[get().index - 2] === " "
    ) {
      while (get().code[get().index - offset] === " ") {
        offset++;
      }
    }
    return offset;
  },
  _buildLiterals: (code: string) => {
    const literals = code
      .substring(0)
      .split(/[.\-=/_\:\;\,\}\{\)\(\"\'\]\[\/\#\?\>\<\&\*]/)
      .flatMap((r) => {
        return r.split(/[\n\r\s\t]+/);
      })
      .filter(Boolean);
    return literals;
  },
}));

export enum TrackedKeys {
  Backspace = "Backspace",
}

function isLineBreak(key: string) {
  return key === "\n";
}

function isBackspace(key: string) {
  return key === TrackedKeys.Backspace;
}

function parseKey(key: string) {
  switch (key) {
    case "Enter":
      return "\n";
    default:
      return key;
  }
}

function isSkippable(key: string) {
  switch (key) {
    case "Shift":
    case "OS":
    case "Control":
      return true;
    default:
      return false;
  }
}

function calculateExpectedMaxCorrectKeyStrokes(code: string) {
  const expectedMaxCorrectKeyStrokes = code
    .split("\n")
    .map((subText) => subText.trimStart())
    .join("\n").length;
  return expectedMaxCorrectKeyStrokes;
}
