import create from "zustand";
import { cpmToWPM } from "../../../common/utils/cpmToWPM";

export interface KeyStroke {
  key: string;
  timestamp: number;
  index: number;
  correct: boolean;
}

interface CodeState {
  // Match state
  startTime?: Date;
  endTime?: Date;
  keyStrokes: KeyStroke[];
  // TODO: Can we move match state to GameState
  // perhaps start and end time can be set from backend events
  start: () => void;
  end: () => void;
  isPlaying: () => boolean;
  getChartWPM: () => number[];
  _getValidKeyStrokes: () => KeyStroke[];
  _getIncorrectKeyStrokes: () => KeyStroke[];

  // Code rendering state
  code: string;
  index: number;
  correctIndex: number;
  correctChars: () => string;
  incorrectChars: () => string;
  currentChar: () => string;
  untypedChars: () => string;
  initialize: (code: string) => void;
  handleBackspace: () => void;
  handleKeyPress: (keyStroke: KeyStroke) => void;
  keyPressFactory: (key: string) => KeyStroke;
  isCompleted: () => boolean;
  correctInput: () => string;
  // private helper methods
  _getBackspaceOffset: () => number;
  _getForwardOffset: () => number;
  _allCharsTyped: () => boolean;
}

// There are 3 separate parts of logic in this store
// 1. Code rendering logic which is necessary to render the code strings
// 2. Match logic which concerns itself with maintaining the match
// 3. Results logic which shows data after the race
// Match logic depends on code rendering logic.
// Results logic depends on Match logic.
// Perhaps Match and results logic could be split into a separate store
// But this was a bit simpler as we can just push to keyStrokes from the handleKeyPress method
// The other option would be to pass in the saveKeyStroke method into the handleKeyPress method

export const useCodeStore = create<CodeState>((set, get) => ({
  // RESULTS logic
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
        keyStrokes
          .filter((stroke) => stroke.correct)
          .map((keyStroke) => [keyStroke.index, keyStroke])
      )
    );
    return validKeyStrokes;
  },
  _getIncorrectKeyStrokes: () => {
    const keyStrokes = get().keyStrokes;
    return keyStrokes.filter((stroke) => !stroke.correct);
  },
  // MATCH logic
  keyStrokes: [],
  incorrectKeyStrokes: [],
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
  code: "",
  index: 0,
  correctIndex: 0,
  initialize: (code: string) => {
    set((state) => ({
      ...state,
      code,
      index: 0,
      correctIndex: 0,
      startTime: undefined,
      endTime: undefined,
      chars: [],
      keyStrokes: [],
    }));
  },
  handleBackspace: () => {
    set((state) => {
      const offset = state._getBackspaceOffset();
      const index = Math.max(state.index - offset, 0);
      const correctIndex = Math.min(index, state.correctIndex);
      return { ...state, index, correctIndex };
    });
  },
  keyPressFactory: (unparsedKey: string) => {
    const key = parseKey(unparsedKey);
    const offset = get()._getForwardOffset();
    const index = Math.min(offset + get().index, get().code.length);
    const correct =
      get().index === get().correctIndex && key === get().code[get().index];
    const keyStroke = {
      key,
      index,
      timestamp: new Date().getTime(),
      correct,
    };
    return keyStroke;
  },
  handleKeyPress: (keyStroke: KeyStroke) => {
    set((state) => {
      if (isSkippable(keyStroke.key)) return state;
      if (state._allCharsTyped()) return state;
      const index = keyStroke.index;
      const correctIndex = !keyStroke.correct ? state.correctIndex : index;
      state.keyStrokes.push(keyStroke);
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
}));

export enum TrackedKeys {
  Backspace = "Backspace",
}

function isLineBreak(key: string) {
  return key === "\n";
}

function parseKey(key: string) {
  switch (key) {
    case "Enter":
      return "\n";
    default:
      return key;
  }
}

export function isSkippable(key: string) {
  switch (key) {
    case "Shift":
    case "OS":
    case "Control":
      return true;
    default:
      return false;
  }
}
