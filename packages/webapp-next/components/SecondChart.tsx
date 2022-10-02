import React, { useEffect } from "react";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import cpmToWpm from "../utils/cpmToWpm";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const renderChart = (
  ref: React.MutableRefObject<any>,
  challengeResults: any[]
) => {
  const ctx = ref?.current.getContext("2d");

  const labels = [];
  const max = [];
  const avg = [];
  const min = [];
  const backgroundColor = [];

  for (const result of challengeResults) {
    const { maxCpm, averageCpm, minCpm, date } = result;
    labels.push(date); // instead of index put date here
    max.push(cpmToWpm(maxCpm));
    avg.push(cpmToWpm(averageCpm));
    min.push(cpmToWpm(minCpm));
    backgroundColor.push("#d6bcfa");
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          fill: "origin",
          label: "Highest",
          data: max,
          //  backgroundColor,
          borderColor: ["#a0aec0"],
          pointRadius: 7,
          pointBackgroundColor: "#a0aec0",
        },
        {
          fill: "origin",
          label: "Average",
          data: avg,
          backgroundColor: ["#18181de8"],
          borderColor: ["#9f7aea"],
          pointRadius: 7,
          pointBackgroundColor: "#9f7aea",
        },
        {
          fill: "origin",
          label: "Lowest",
          data: min,
          backgroundColor: ["#0e0e11e8"],
          borderColor: ["#f56565"],
          pointRadius: 7,
          pointBackgroundColor: "#f56565",
        },
      ],
    },
    // TODO: fix type errors with Chart.js v3
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

interface SecondChartProps {
  resultSelector: "monthly" | "annual";
  challengeResults: any[];
}

// TODO: we should not have Chart and SecondChart
// We should refactor these 2 components to be compatible
const SecondChart = ({
  challengeResults,
  resultSelector,
}: SecondChartProps) => {
  const monthlyRef = React.createRef<HTMLCanvasElement>();
  const annual = React.createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (resultSelector === "monthly" && monthlyRef.current) {
      renderChart(monthlyRef, challengeResults);
    }
    if (resultSelector === "annual" && annual.current) {
      renderChart(annual, challengeResults);
    }
  }, [monthlyRef, annual, resultSelector, challengeResults]);

  return (
    <div
      className="max-w-5 xl w-full flex-grow bg-dark-ocean shadow-2xl items-center mt-2 pl-4 py-2 text-lg text-off-white font-light rounded"
      style={{ height: "350px" }}
    >
      {resultSelector === "monthly" ? (
        <canvas ref={monthlyRef} width="400" height="400" />
      ) : null}
      {resultSelector === "annual" ? (
        <canvas ref={annual} width="400" height="400" />
      ) : null}
    </div>
  );
};

export default SecondChart;
