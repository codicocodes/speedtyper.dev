import * as resultsAPI from "../../../common/api/results";
import { useUserStore } from "../../../common/state/user-store";
import { useCodeStore } from "../state/code-store";
import { useGameStore } from "../state/game-store";

export async function saveResult() {
  const data = {
    userId: useUserStore.getState().id,
    raceId: useGameStore.getState().id,
    cpm: useCodeStore.getState().getCPM(),
    ms: useCodeStore.getState().getTimeMS(),
    mistakes: useCodeStore.getState().getMistakesCount(),
    accuracy: useCodeStore.getState().getAccuracy(),
  };
  await resultsAPI.saveResult(data);
}
