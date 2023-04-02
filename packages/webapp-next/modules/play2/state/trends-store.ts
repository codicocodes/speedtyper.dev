import create from "zustand";
import { useUserStore } from "../../../common/state/user-store";
import { cpmToWPM } from "../../../common/utils/cpmToWPM";
import { getExperimentalServerUrl } from "../../../common/utils/getServerUrl";

export interface TrendsState {
  tenGameWPM: number | null;
  todayWPM: number | null;
  weekWPM: number | null;
  allTimeWPM: number | null;
}

export const useTrendStore = create<TrendsState>((_set, _get) => ({
  tenGameWPM: null,
  todayWPM: null,
  weekWPM: null,
  allTimeWPM: null,
}));

export const refreshTrends = () => {
  const isAnonymous = useUserStore.getState().isAnonymous;
  if (isAnonymous) {
    return;
  }
  const baseUrl = getExperimentalServerUrl();
  const url = baseUrl + "/api/results/stats";
  fetch(url, {
    credentials: "include",
  }).then((res) =>
    res.json().then(({ cpmLast10, cpmToday, cpmLastWeek, cpmAllTime }) => {
      useTrendStore.setState(() => ({
        tenGameWPM: cpmToWPM(cpmLast10),
        todayWPM: cpmToWPM(cpmToday),
        weekWPM: cpmToWPM(cpmLastWeek),
        allTimeWPM: cpmToWPM(cpmAllTime),
      }));
    })
  );
};
