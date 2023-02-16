import create from "zustand";

export interface SettingsState {
  rerenderIdx: number;
  settingsModalIsOpen: boolean;
  smoothCaret: boolean;
}

const SMOOTH_CARET_KEY = "smoothCaret";

const defaultSmoothCaretSetting = true;

function getInitialSmoothCaretSetting(): boolean {
  if (typeof document !== "undefined" && window) {
    let smoothCaretStr = localStorage.getItem(SMOOTH_CARET_KEY);
    if (!smoothCaretStr) {
      localStorage.setItem(
        SMOOTH_CARET_KEY,
        defaultSmoothCaretSetting.toString()
      );
      smoothCaretStr = defaultSmoothCaretSetting.toString();
    }
    return smoothCaretStr === "true" ?? false;
  }
  return true;
}

export const useSettingsStore = create<SettingsState>((_set, _get) => ({
  rerenderIdx: 0,
  settingsModalIsOpen: false,
  smoothCaret: getInitialSmoothCaretSetting(),
}));

export const setCaretType = (caretType: "smooth" | "block") => {
  const smoothCaret = caretType === "smooth";
  localStorage.setItem(SMOOTH_CARET_KEY, smoothCaret.toString());
  useSettingsStore.setState((state) => ({ ...state, smoothCaret }));
};

export const openSettingsModal = () => {
  useSettingsStore.setState((s) => ({
    ...s,
    rerenderIdx: s.rerenderIdx + 1,
    settingsModalIsOpen: true,
  }));
};

export const closeSettingsModal = () => {
  useSettingsStore.setState((s) => ({
    ...s,
    settingsModalIsOpen: false,
  }));
};
