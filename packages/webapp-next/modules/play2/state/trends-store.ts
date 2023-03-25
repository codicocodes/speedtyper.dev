import create from "zustand";
import { cpmToWPM } from "../../../common/utils/cpmToWPM";
import { getExperimentalServerUrl } from "../../../common/utils/getServerUrl";

export interface TrendsState {
  threeGameWPM: number | null;
  tenGameWPM: number | null;
  todayWPM: number | null;
}

export const useTrendStore = create<TrendsState>((_set, _get) => ({
  threeGameWPM: null,
  tenGameWPM: null,
  todayWPM: null,
}));

export const refreshTrends = () => {
  const baseUrl = getExperimentalServerUrl();
  const url = baseUrl + "/api/results/stats";
  fetch(url, {
    credentials: "include",
  }).then((res) =>
    res.json().then(({ cpmToday, cpmLast10, cpmLast3 }) => {
      useTrendStore.setState(() => ({
        todayWPM: cpmToWPM(cpmToday),
        tenGameWPM: cpmToWPM(cpmLast10),
        threeGameWPM: cpmToWPM(cpmLast3),
      }));
    })
  );
};
