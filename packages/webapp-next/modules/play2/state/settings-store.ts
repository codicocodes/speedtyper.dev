import create from "zustand";
import { getExperimentalServerUrl } from "../../../common/utils/getServerUrl";

export interface SettingsState {
  settingsModalIsOpen: boolean;
  smoothCaret: boolean;
  syntaxHighlighting: boolean;
  raceIsPublic: boolean;
}

const SYNTAX_HIGHLIGHTING_KEY = "syntaxHighlighting";

const SMOOTH_CARET_KEY = "smoothCaret";

const defaultSmoothCaretSetting = true;

function getInitialToggleStateFromLocalStorage(key: string): boolean {
  if (typeof document !== "undefined" && window) {
    let toggleStateStr = localStorage.getItem(key);
    if (!toggleStateStr) {
      localStorage.setItem(key, defaultSmoothCaretSetting.toString());
      toggleStateStr = defaultSmoothCaretSetting.toString();
    }
    return toggleStateStr === "true" ?? false;
  }
  return true;
}

export const useSettingsStore = create<SettingsState>((_set, _get) => ({
  settingsModalIsOpen: false,
  smoothCaret: getInitialToggleStateFromLocalStorage(SMOOTH_CARET_KEY),
  syntaxHighlighting: getInitialToggleStateFromLocalStorage(
    SYNTAX_HIGHLIGHTING_KEY
  ),
  raceIsPublic: false,
}));

export const setCaretType = (caretType: "smooth" | "block") => {
  const smoothCaret = caretType === "smooth";
  localStorage.setItem(SMOOTH_CARET_KEY, smoothCaret.toString());
  useSettingsStore.setState((state) => ({ ...state, smoothCaret }));
};

export const toggleSyntaxHighlightning = () => {
  const syntaxHighlightingStr = localStorage.getItem(SYNTAX_HIGHLIGHTING_KEY);
  let syntaxHighlighting = syntaxHighlightingStr === "true";
  syntaxHighlighting = !syntaxHighlighting;
  localStorage.setItem(SYNTAX_HIGHLIGHTING_KEY, syntaxHighlighting.toString());
  useSettingsStore.setState((state) => ({ ...state, syntaxHighlighting }));
};

export const openSettingsModal = () => {
  useSettingsStore.setState((s) => ({
    ...s,
    settingsModalIsOpen: true,
  }));
};

export const closeSettingsModal = () => {
  useSettingsStore.setState((s) => ({
    ...s,
    settingsModalIsOpen: false,
  }));
};

export const toggleRaceIsPublic = () => {
  const baseUrl = getExperimentalServerUrl();
  const url = baseUrl + "/api/races/online";
  fetch(url, {
    method: "POST",
    credentials: "include",
  }).then((res) =>
    res.json().then(({ isPublic: raceIsPublic }) => {
      useSettingsStore.setState((s) => ({ ...s, raceIsPublic }));
    })
  );
};
