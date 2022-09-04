import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import cpmToWpm from "../utils/cpmToWpm";

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
          // backgroundColor,
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
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "#18181b",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "WPM",
            },
            gridLines: {
              color: "#18181b",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

export default ({ challengeResults, resultSelector }) => {
  const chartRef = useRef();

  const [toggledSelector, setToggledSelector] = useState(null);
  useEffect(() => {
    if (chartRef.current && resultSelector !== toggledSelector) {
      renderChart(chartRef, challengeResults);
      setToggledSelector(resultSelector);
    }
  }, [resultSelector, chartRef]);

  return (
    <div
      className="max-w-5 xl w-full flex-grow bg-dark-lake shadow-2xl items-center mt-2 py-2 text-lg text-off-white font-light rounded"
      style={{ height: "350px" }}
    >
      <canvas ref={chartRef} width="400" height="400" />
    </div>
  );
};
