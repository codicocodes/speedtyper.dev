import create from "zustand";
import { User, useUserStore } from "../../../common/state/user-store";
import { Game } from "../services/Game";
import { useCodeStore } from "./code-store";

export interface SettingsState {
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
  smoothCaret: getInitialSmoothCaretSetting(),
}));

export const toggleSmoothCaret = () => {
  const smoothCaret = !useSettingsStore.getState().smoothCaret;
  localStorage.setItem(SMOOTH_CARET_KEY, smoothCaret.toString());
  useSettingsStore.setState((state) => ({ ...state, smoothCaret }));
};
