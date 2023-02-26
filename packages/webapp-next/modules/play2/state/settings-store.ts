import create from "zustand";
import { getExperimentalServerUrl } from "../../../common/utils/getServerUrl";

export interface SettingsState {
  settingsModalIsOpen: boolean;
  languageModalIsOpen: boolean;
  leaderboardModalIsOpen: boolean;
  profileModalIsOpen: boolean;
  publicRacesModalIsOpen: boolean;
  languageSelected: { language: string; name: string } | null;
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
  languageModalIsOpen: false,
  leaderboardModalIsOpen: false,
  profileModalIsOpen: false,
  publicRacesModalIsOpen: false,
  smoothCaret: getInitialToggleStateFromLocalStorage(SMOOTH_CARET_KEY),
  syntaxHighlighting: getInitialToggleStateFromLocalStorage(
    SYNTAX_HIGHLIGHTING_KEY
  ),
  raceIsPublic: false,
  languageSelected: null,
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
  if (useSettingsStore.getState().profileModalIsOpen) return;
  if (useSettingsStore.getState().leaderboardModalIsOpen) return;
  useSettingsStore.setState((s) => ({
    ...s,
    settingsModalIsOpen: true,
  }));
};

export const openLanguageModal = () => {
  if (useSettingsStore.getState().profileModalIsOpen) return;
  if (useSettingsStore.getState().leaderboardModalIsOpen) return;
  useSettingsStore.setState((s) => ({
    ...s,
    languageModalIsOpen: true,
  }));
};

export const openProfileModal = () => {
  useSettingsStore.setState((s) => ({
    ...s,
    profileModalIsOpen: true,
  }));
};

export const openLeaderboardModal = () => {
  if (useSettingsStore.getState().settingsModalIsOpen) return;
  useSettingsStore.setState((s) => ({
    ...s,
    leaderboardModalIsOpen: true,
  }));
};

export const openPublicRacesModal = () => {
  if (useSettingsStore.getState().settingsModalIsOpen) return;
  useSettingsStore.setState((s) => ({
    ...s,
    publicRacesModalIsOpen: true,
  }));
};

export const useHasOpenModal = () => {
  const leaderboardModalIsOpen = useSettingsStore(
    (s) => s.leaderboardModalIsOpen
  );
  const settingsModalIsOpen = useSettingsStore((s) => s.settingsModalIsOpen);
  return leaderboardModalIsOpen || settingsModalIsOpen;
};

export const closeModals = () => {
  useSettingsStore.setState((s) => ({
    ...s,
    settingsModalIsOpen: false,
    leaderboardModalIsOpen: false,
    profileModalIsOpen: false,
    publicRacesModalIsOpen: false,
    languageModalIsOpen: false,
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
