// TODO: Refactor this entire file.
// IGameState and IUserGameState are filled with optional properties
// this needs to change, they should be required

import calculateAccuracy from "../utils/calculateAccuracy";

import {
  IUserGameState,
  IChallenge,
  IRenderedStrings,
  IAction,
  IChar,
  IGameStats,
  IGameState,
  IKeyPress,
} from "../types";

import stripIndentation from "../utils/stripIndentation";

const findPreviousIndex = (chars: IChar[], index: number) => {
  let nextIndex = index - 1;
  for (nextIndex; nextIndex >= 0; nextIndex--) {
    if (!chars[nextIndex].skipped) {
      break;
    }
  }
  return nextIndex;
};

const handleKeyPressRenderedStrings = (
  state: IUserGameState,
  challenge: IChallenge,
  index: number,
  hasMistake: boolean
) => {
  const { index: oldIndex, renderedStrings } = state;

  const correctChars = `${renderedStrings.correctChars}${
    !hasMistake
      ? renderedStrings.indentation.concat(
          challenge.chars?.[oldIndex]?.value ?? ""
        )
      : ""
  }`;

  const wrongChars = `${renderedStrings.wrongChars}${
    hasMistake
      ? renderedStrings.indentation.concat(
          challenge.chars?.[oldIndex]?.value ?? ""
        )
      : ""
  }`;

  const indentation =
    challenge.fullCodeString?.slice(oldIndex + 1, index) ?? "";

  const nextChar = challenge.chars?.[index]?.value ?? "";

  const untypedChars = challenge.fullCodeString?.slice(index + 1) ?? "";

  return {
    ...renderedStrings,
    correctChars,
    wrongChars,
    indentation,
    nextChar,
    untypedChars,
  };
};

const handleKeyPressGameStats = (
  startTime: number,
  currGameStats: IGameStats,
  renderedStrings: IRenderedStrings,
  hasMistake: boolean
): IGameStats => {
  const combo = hasMistake ? 0 : currGameStats.combo + 1;

  const mistakeCount = currGameStats.mistakeCount + Number(hasMistake);

  const maxCombo =
    combo > currGameStats.maxCombo ? combo : currGameStats.maxCombo;

  const typedCharsCount = currGameStats.typedCharsCount + 1;

  const time = new Date().getTime() - startTime;

  const totalCpm = Math.floor(
    stripIndentation(renderedStrings.correctChars).length / (time / 60000)
  );

  const accuracy = calculateAccuracy(typedCharsCount, mistakeCount);

  return {
    ...currGameStats,
    combo,
    maxCombo,
    typedCharsCount,
    totalCpm,
    mistakeCount,
    accuracy,
  };
};

const findNextIndex = (
  state: IUserGameState,
  challenge: IChallenge
): number => {
  let nextIndex = state.index + 1;

  const charLength = challenge.chars?.length ?? nextIndex;

  for (nextIndex; nextIndex < charLength; nextIndex++) {
    if (!challenge.chars?.[nextIndex]) {
      break;
    }

    if (!challenge.chars[nextIndex].skipped) {
      break;
    }

    if (!nextIndex) {
      break;
    }
  }
  return nextIndex;
};

const handleBackspaceRenderedStrings = (
  state: IUserGameState,
  challenge: IChallenge,
  hasMistake: boolean,
  index: number
): IRenderedStrings => {
  const nextNextIndex = findPreviousIndex(challenge.chars ?? [], index);
  const indentation =
    challenge.fullCodeString?.slice(nextNextIndex + 1, index) ?? "";
  const correctCharsEnd = indentation ? nextNextIndex + 1 : index;
  const indexDiff = index - nextNextIndex;
  const correctChars = !hasMistake
    ? state.renderedStrings.correctChars.substr(0, correctCharsEnd)
    : state.renderedStrings.correctChars;
  const wrongChars = state.hasMistake
    ? state.renderedStrings.wrongChars.substr(
        0,
        state.renderedStrings.wrongChars.length - indexDiff
      )
    : state.renderedStrings.wrongChars;
  const nextChar = challenge.chars?.[index].value ?? "";

  const untypedChars = challenge.fullCodeString?.slice(index + 1) ?? "";

  return {
    ...state.renderedStrings,
    indentation,
    correctChars,
    wrongChars,
    nextChar,
    untypedChars,
  };
};

const handleKeyUp = (
  state: IUserGameState,
  payload: IKeyPress
): IUserGameState => {
  return {
    ...state,
    gameStats: {
      ...state.gameStats,
      keyPresses: [...state.gameStats.keyPresses, payload],
    },
  };
};

const handleBackspace = (
  state: IUserGameState,
  challenge: IChallenge
): IUserGameState => {
  const index = findPreviousIndex(challenge.chars ?? [], state.index);

  const input = state.input.substr(0, state.input.length - 1);

  const hasMistake =
    input !== challenge.strippedCode.substring(0, input.length);

  // Do not allow users to delete correctly typed characters
  if (!state.hasMistake) {
    return state;
  }

  return {
    ...state,
    hasMistake,
    index,
    input,
    renderedStrings: handleBackspaceRenderedStrings(
      state,
      challenge,
      hasMistake,
      index
    ),
  };
};

const handleInputChange = (
  startTime: number,
  state: IUserGameState,
  challenge: IChallenge,
  pressedKey: string
): IUserGameState => {
  const typedChar = pressedKey === "Enter" ? "\n" : pressedKey;

  const index = findNextIndex(state, challenge);

  const input = state.input.concat(typedChar);
  const hasMistake = input !== challenge.strippedCode.substr(0, input.length);

  const renderedStrings = handleKeyPressRenderedStrings(
    state,
    challenge,
    index,
    hasMistake
  );

  return {
    ...state,
    index,
    input,
    hasMistake,
    renderedStrings,
    gameStats: handleKeyPressGameStats(
      startTime,
      state.gameStats,
      renderedStrings,
      hasMistake
    ),
  };
};

export const defaultGameState: IGameState = {
  waiting: true,
  loaded: false,
  loadingFailed: false,
  users: {},
};

export default (state: IGameState, action: IAction): IGameState => {
  const { type, payload } = action;

  switch (type) {
    case "user_left": {
      const userId = payload;
      const { [userId]: _leavingUser, ...users } = state.users;
      return {
        ...state,
        users,
      };
    }

    case "timer_started":
      return {
        ...state,
        users: {
          ...state.users,
          [state.currentUserId ?? ""]: {
            ...state.users[state.currentUserId ?? ""],
          },
        },
      };

    case "race_queued":
      const { ms } = payload;

      return {
        ...state,
        queueTimeMs: ms,
      };

    case "race_started":
      return {
        ...state,
        startTime: payload.startTime,
        waiting: false,
      };

    case "user_disconnected": {
      const id = payload;

      return {
        ...state,
        users: Object.fromEntries(
          Object.entries(state.users).filter(
            ([userId, _userState]) => userId !== id
          )
        ),
      };
    }

    case "user_joined":
      return {
        ...state,
        users: {
          ...state.users,
          [payload.id]: payload,
        },
      };

    case "race_completed": {
      const { userId, cpmTimeSeries } = payload;
      const user = state.users[userId];
      return {
        ...state,
        users: {
          ...state.users,
          [userId]: {
            ...user,
            cpmTimeSeries,
            endTime: payload.endTime,
            gameStats: {
              ...(user?.gameStats ?? null),
              totalCpm: payload.cpm,
              progress: 100,
            },
            result: payload,
          },
        },
      };
    }

    case "race_joined": {
      return {
        ...state,
        ...payload,
        loaded: true,
      };
    }

    case "user_progress_updated": {
      const user = state.users[payload.userId];
      const updatedUser = {
        ...user,
        gameStats: {
          ...(user?.gameStats ?? null),
          progress: payload.progress,
          trailingCpm: payload.trailingCpm,
        },
      };
      return {
        ...state,
        users: {
          ...state.users,
          [payload.userId]: updatedUser,
        },
      };
    }

    case "user_race_state_updated": {
      return {
        ...state,
        loaded: true,
        owner: state.owner,
        selectedUserId: state.selectedUserId ?? payload.id,
        currentUserId: state.currentUserId ?? payload.id,
        users: {
          ...state.users,
          [payload.id]: payload,
        },
      };
    }

    case "challenge_selected": {
      return {
        ...state,
        waiting: true,
        startTime: undefined,
        challenge: payload,
      };
    }

    case "race_joined_failed": {
      return { ...state, loadingFailed: true, errorMessage: payload };
    }

    case "key_up":
      return {
        ...state,
        users: {
          ...state.users,
          [state.currentUserId ?? ""]: handleKeyUp(
            state.users[state.currentUserId ?? ""],
            payload
          ),
        },
      };

    case "input_change": {
      const startTime = state.startTime;
      return {
        ...state,
        users: {
          ...state.users,
          [state.currentUserId ?? ""]: handleInputChange(
            startTime ?? 0,
            state.users[state.currentUserId ?? ""],
            // @ts-ignore
            state.challenge,
            payload
          ),
        },
      };
    }

    case "backspace_press":
      return {
        ...state,
        users: {
          ...state.users,
          // @ts-ignore
          [state.currentUserId]: handleBackspace(
            // @ts-ignore
            state.users[state.currentUserId],
            // @ts-ignore
            state.challenge
          ),
        },
      };

    case "reset_state":
      return {
        ...defaultGameState,
        id: state.id,
        owner: state.owner,
        currentUserId: state.currentUserId,
        selectedUserId: state.selectedUserId,
        users: state.users,
        challenge: state.challenge,
      };
    default:
      return state;
  }
};
