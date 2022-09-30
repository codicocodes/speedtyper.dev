import create from "zustand";

interface CodeState {
  code: string;
  index: number;
  correctIndex: number;
  correctChars: () => string;
  incorrectChars: () => string;
  currentChar: () => string;
  // nextChar: () => string;
  // nextNextChar: () => string;
  untypedChars: () => string;
  initialize: (code: string) => void;
  handleKeyPress: (key: string) => void;

  // private helper methods
  _getBackspaceOffset: () => number;
  _getForwardOffset: () => number;
  _allCharsTyped: () => boolean;
}

export const useCodeStore = create<CodeState>((set, get) => ({
  code: "",
  index: 0,
  correctIndex: 0,
  initialize: (code: string) => {
    set((state) => ({ ...state, code, index: 0, correctIndex: 0 }));
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
